const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class GoogleService {
  constructor(clientId, clientSecret, redirectUri, jwtSecret) {
    this.clientId = process.env.GOOGLE_CLIENT_ID;
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.redirectUri = GOOGLE_OAUTH_REDIRECT;
    this.jwtSecret = process.env.JWT_SECRET_TOKEN;
    this.oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );
    if (!this.client_id || !this.client_secret || !this.redirect_url) {
      throw new Error("Google Oauth Credentials not Found or not Complete!");
    }
  }

  getAuthCode = () => {
    const baseUrl = "https://accounts.google.com/o/oauth2/auth";
    const scopes =
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    const authUrl = `${baseUrl}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&scope=${scopes}`;
    return authUrl;
  };

  async getGoogleAccessToken(code) {
    try {
      const { data } = await axios({
        method: "post",
        url: "https://oauth2.googleapis.com/token",
        params: {
          code: code,
          client_id: this.googleClientId,
          client_secret: this.googleClientSecret,
          redirect_uri: this.redirectUrl,
          grant_type: "authorization_code",
        },
      });
      return data.access_token;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to retrieve Google access token");
    }
  }

  async getGoogleUserInfo(access_token) {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to retrieve Google user info");
    }
  }

  async createToken(user) {
    try {
      const token = await jwt.sign(
        { id: user.id, email: user.email },
        this.jwtSecret,
        {
          expiresIn: "24h",
        }
      );
      return token;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create JWT token");
    }
  }

  async verifyToken(token) {
    try {
      const decoded = await jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to verify JWT token");
    }
  }
}

module.exports = GoogleService;
