/**
 * TryCatch Live Alerts — Netlify Scheduled Function
 *
 * Se ejecuta cada 5 minutos. Consulta YouTube para detectar si el canal
 * está en vivo y, si es así, envía una notificación push via OneSignal.
 *
 * Usa Netlify Blobs para evitar notificaciones duplicadas del mismo live.
 *
 * Quota YouTube API: 5 min -> 12 veces/hora -> 288 llamadas/día × 100 unidades = 28.800 unidades/día
 * (Atención: Esto supera el límite gratuito de 10.000 unidades/día de YouTube, considera ajustarlo o solicitar extensión)
 */

import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const ONESIGNAL_API_URL = "https://onesignal.com/api/v1/notifications";

interface LiveStream {
  videoId: string;
  title: string;
}

// Consulta la API de YouTube para ver si el canal está transmitiendo en vivo
async function getLiveStream(
  apiKey: string,
  channelId: string
): Promise<LiveStream | null> {
  const params = new URLSearchParams({
    part: "snippet",
    channelId,
    eventType: "live",
    type: "video",
    key: apiKey,
  });

  const res = await fetch(`${YOUTUBE_SEARCH_URL}?${params.toString()}`);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube API ${res.status}: ${body}`);
  }

  const data = await res.json();

  // Sin resultados = no hay live activo
  if (!data.items || data.items.length === 0) {
    return null;
  }

  return {
    videoId: data.items[0].id.videoId as string,
    title: data.items[0].snippet.title as string,
  };
}

// Envía la notificación push a todos los suscriptores via OneSignal REST API
async function sendPushNotification(
  appId: string,
  restApiKey: string,
  videoId: string,
  title: string
): Promise<void> {
  const res = await fetch(ONESIGNAL_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${restApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app_id: appId,
      included_segments: ["All"],
      headings: { en: "🔴 TryCatch.tv está en vivo" },
      contents: { en: title },
      url: `https://www.youtube.com/watch?v=${videoId}`,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`OneSignal API error: ${JSON.stringify(error)}`);
  }
}

export default async function handler(_req: Request): Promise<Response> {
  // 1. Leer variables de entorno (configuradas en Netlify Dashboard)
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;
  const onesignalAppId = process.env.ONESIGNAL_APP_ID;
  const onesignalRestApiKey = process.env.ONESIGNAL_REST_API_KEY;

  const missing = [
    !youtubeApiKey && "YOUTUBE_API_KEY",
    !youtubeChannelId && "YOUTUBE_CHANNEL_ID",
    !onesignalAppId && "ONESIGNAL_APP_ID",
    !onesignalRestApiKey && "ONESIGNAL_REST_API_KEY",
  ].filter(Boolean);

  if (missing.length > 0) {
    const msg = `Missing env vars: ${missing.join(", ")}`;
    console.error(`[check-live] ${msg}`);
    return new Response(msg, { status: 500 });
  }

  try {
    // 2. Verificar si hay un live activo en YouTube
    const liveStream = await getLiveStream(youtubeApiKey!, youtubeChannelId!);

    if (!liveStream) {
      console.log("[check-live] No hay transmisión en vivo actualmente.");
      return new Response("No live now", { status: 200 });
    }

    const { videoId, title } = liveStream;
    console.log(`[check-live] Live detectado: "${title}" (${videoId})`);

    // 3. Revisar en Netlify Blobs si ya notificamos este videoId
    const store = getStore("live-alerts");
    const lastNotifiedVideoId = await store.get("lastNotifiedVideoId");

    if (lastNotifiedVideoId === videoId) {
      console.log(
        `[check-live] Ya se notificó para videoId=${videoId}. Omitiendo.`
      );
      return new Response("Already notified", { status: 200 });
    }

    // 4. Enviar notificación push a todos los suscriptores
    await sendPushNotification(
      onesignalAppId!,
      onesignalRestApiKey!,
      videoId,
      title
    );

    // 5. Guardar el videoId como último live notificado para evitar duplicados
    await store.set("lastNotifiedVideoId", videoId);

    console.log(`[check-live] ✅ Notificación enviada: "${title}"`);
    return new Response(`Notification sent: ${title}`, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[check-live] Error: ${message}`);
    return new Response(`Error: ${message}`, { status: 500 });
  }
}

// Ejecutar cada 5 minutos
export const config: Config = {
  schedule: "*/5 * * * *",
};
