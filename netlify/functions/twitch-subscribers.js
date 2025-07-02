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

    return {
      statusCode: 200,
      body: JSON.stringify(subsData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
