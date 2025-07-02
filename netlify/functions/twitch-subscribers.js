const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const accessToken = process.env.TWITCH_ACCESS_TOKEN;
  const broadcasterId = process.env.TWITCH_BROADCASTER_ID;

  if (!clientId || !accessToken || !broadcasterId) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Missing environment variables",
        clientId: !!clientId,
        accessToken: !!accessToken,
        broadcasterId: !!broadcasterId,
      }),
    };
  }

  try {
    // 1. Obtener la lista de suscriptores
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

    // 2. Obtener los avatares de los usuarios
    const userIds = subs.map((sub) => sub.user_id);
    // Twitch permite hasta 100 IDs por petición
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

    // 3. Unir el avatar a cada sub
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
