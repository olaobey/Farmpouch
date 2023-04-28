const GoogleService = require("../../service/googleOauth");
const User = require("../../model/userModel");

class AuthController {
  constructor(clientId, clientSecret, redirectUrl, jwtSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUrl = redirectUrl;
    this.jwtSecret = jwtSecret;
  }

  static getAuthorizationCode = async (req, res) => {
    const authUrl = GoogleService.getAuthCode();

    res.status(200).json({
      redirect_link: authUrl,
      success: true,
    });
  };

  static async googleSignIn(req, res) {
    const { code } = req.query;
    if (!code) {
      throw new Error("Authorization code not provided!");
    }
    const googleService = new GoogleService(
      this.clientId,
      this.clientSecret,
      this.redirectUrl,
      this.jwtSecret
    );

    try {
      // Get access token and user info from Google
      const { tokens } = await googleService.getGoogleAccessTokens(code);

      const { data } = await googleService.getGoogleUserInfo(tokens);

      const { name, verified_email, email } =
        await GoogleService.getGoogleUserInfo({
          id_token,
          access_token,
        });
      if (!verified_email && !name && !email) {
        throw new AuthError("Google Account not Verified!");
      }

      // Check if user already exists in database, if not create new user
      let user = await User.findOne({ where: { email: data.email } });
      if (!user) {
        user = await User.create({
          name: `${data.givenName} ${data.familyName}`,
          email: data.email,
          role: "user",
        });
      }

      // Generate JWT token for user
      const token = jwt.sign({ id: user.id }, this.jwtSecret, {
        expiresIn: "1d",
      });

      // Send response with JWT token
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = AuthController;
