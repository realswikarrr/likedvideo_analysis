import axios from "axios";

async function revokeToken(tokenToRevoke) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/revoke",
      null,
      {
        params: {
          token: tokenToRevoke,
          client_id: clientId,
          client_secret: clientSecret,
        },
      }
    );

    console.log("Token revoked:", response.data);
  } catch (error) {
    console.error("Error revoking token:", error.message);
  }
}

export default revokeToken;
