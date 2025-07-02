const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const broadcasterId = process.env.TWITCH_BROADCASTER_ID;

  // 1. Obtener el token de acceso
  const tokenRes = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    {
      method: "POST",
    }
  );
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  // 2. Llamar a la API de Twitch para obtener los suscriptores
  const subsRes = await fetch(
    `https://api.twitch.tv/helix/subscriptions?broadcaster_id=${broadcasterId}`,
    {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const subsData = await subsRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(subsData),
  };
};
