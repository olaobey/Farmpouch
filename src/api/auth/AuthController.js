const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");
const resetToken = require("../../model/resetTokensModel");
const crypto = require("crypto");
const mailer = require("../../utils/sendMail");
const bcrypt = require("bcrypt");
const { genPassword, validPassword } = require("../../utils/validator");

exports.signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if user with email already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "User with that email already exists" });
    }

    // Hash password
    const hashedPassword = await genPassword(password);

    // Create new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      dob,
      gender,
      password: hashedPassword,
      phonenumber,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User with that email does not exist" });
    }

    // Check if password is correct
    const isPasswordCorrect = await validPassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    const tokens = jwt.sign({ id: user.id }, process.env.JWT_SECRET_TOKEN);

    // Assigning token in http-only cookie
    res.cookie("jwt", tokens.access_token, {
      ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ tokens: tokens.access_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.editprofile = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phonenumber } = req.body;
    const userId = req.user.id;

    // Check if user with email already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists && userExists.id !== userId) {
      return res
        .status(400)
        .json({ error: "User with that email already exists" });
    }

    // Update user details
    const updatedUser = await User.update(
      { firstname, lastname, email, password, phonenumber },
      { where: { id: userId } }
    );

    return res
      .status(200)
      .json({ data: updatedUser, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createprofile = async (res, req) => {
  try {
    const {
      firstname,
      lastname,
      email,
      dob,
      gender,
      address,
      password,
      phonenumber,
    } = req.body;
    const userId = req.user.id;

    // Check if profile already exists
    const profileExists = await User.findOne({ where: { userId } });
    if (profileExists) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    // Create new profile
    const newProfile = await User.create({
      firstname,
      lastname,
      email,
      dob,
      gender,
      address,
      password,
      phonenumber,
    });

    return res
      .status(201)
      .json({ data: newProfile, message: "Profile created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProfile = async (res, req) => {
  try {
    const profile = await User.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({
        message: "Unauthenticated pls login",
      });
    }
    res.status(200).json({
      success: true,
      profile: profile,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
exports.sendVerificationMail = async (req, res) => {
  try {
    if (req.user.isVerified || req.user.provider == "google") {
      res.status(200).json({ message: "You have already been verified." });
    } else {
      // generate a token
      const token = crypto.randomBytes(32).toString("hex");
      // add that to database
      await resetToken({ token: token, email: req.user.email }).save();
      // send an email for verification
      mailer.sendVerifyEmail(req.user.email, token);
      res.status(200).send({
        message: "Verification mail has been sent successfully",
        username: req.user.username,
        // verified: req.user.isVerified,
        emailSent: true,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
exports.verifyMail = async (req, res) => {
  try {
    // grab the token
    const { token, userId } = req.body;
    // check if token exists
    // or just send an error
    if (token && userId) {
      var check = await resetToken.findOne({ token: token });
      if (check.userId === userId) {
        // token verified
        // set the property of verified to true for the user
        var userData = await User.findOne({ email: check.email });
        userData.isVerified = true;
        await userData.save();
        // delete the token now itself
        await resetToken.findOneAndDelete({ token: token });
        res.status(204).send({ message: "Account verify successfully." });
      } else {
        res.status(400).send({
          message: "Invalid token or Token has expired, Try again.",
        });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email: email });
    console.log(userData);
    if (userData) {
      if (userData.provider == "google") {
        res.status(500).send({
          message: "User exists with Google account.",
          type: "danger",
        });
      }
    }
    // user exists and is not with google
    // generate token
    const token = crypto.randomBytes(32).toString("hex");
    // add that to database
    await resetToken({ token: token, email: email }).save();
    // send an email for verification
    mailer.sendResetEmail(email, token);
    res.status(200).send({
      message: "Reset email sent. Check your email for more info.",
      type: "success",
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "No user Exists with this email.", type: "danger" });
    throw new Error(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    // get passwords
    const { password, password2, email } = req.body;
    console.log(password);
    console.log(password2);
    if (!password || !password2 || password2 !== password) {
      res
        .status(403)
        .send({ message: "Passwords Don't Match !", email: email });
    } else {
      // encrypt the password
      const salt = await bcrypt.genSalt(10);
      if (salt) {
        var hash = await bcrypt.hash(password, salt);
        await User.findOneAndUpdate(
          { email: email },
          { $set: { password: hash } }
        );
      } else {
        res.status(403).send({
          message: "Unexpected Error Try Again",
          email: email,
          reset: true,
        });
      }
    }
  } catch {
    throw new Error(error);
  }
};
