const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const broadcasterId = process.env.TWITCH_BROADCASTER_ID;
  const refreshToken = process.env.TWITCH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !broadcasterId || !refreshToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Missing environment variables",
        clientId: !!clientId,
        clientSecret: !!clientSecret,
        broadcasterId: !!broadcasterId,
        refreshToken: !!refreshToken,
      }),
    };
  }

  try {
    // 1. Obtener un nuevo access token usando el refresh token
    const tokenRes = await fetch(`https://id.twitch.tv/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      return {
        statusCode: tokenRes.status,
        body: JSON.stringify(tokenData),
      };
    }
    const accessToken = tokenData.access_token;
    // const newRefreshToken = tokenData.refresh_token; // Si quieres loguear el nuevo refresh token

    // 2. Obtener la lista de suscriptores
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
    if (!subsRes.ok) {
      return {
        statusCode: subsRes.status,
        body: JSON.stringify(subsData),
      };
    }
    const subs = subsData.data || [];
    if (subs.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ data: [] }),
      };
    }
    // 3. Obtener los avatares de los usuarios
    const userIds = subs.map((sub) => sub.user_id);
    const usersRes = await fetch(
      `https://api.twitch.tv/helix/users?id=${userIds.join("&id=")}`,
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const usersData = await usersRes.json();
    const usersMap = {};
    (usersData.data || []).forEach((user) => {
      usersMap[user.id] = user.profile_image_url;
    });
    // 4. Unir el avatar a cada sub
    const subsWithAvatar = subs.map((sub) => ({
      ...sub,
      user_profile_image_url: usersMap[sub.user_id] || null,
    }));
    return {
      statusCode: 200,
      body: JSON.stringify({ data: subsWithAvatar }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
