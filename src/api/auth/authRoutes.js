const express = require("express");
const { validationRules, validate } = require("../../utils/validator");
const Protect = require("../../middleware/auth");
const {
  signUp,
  signin,
  editprofile,
  getProfile,
  createprofile,
  sendVerificationMail,
  verifyEmail,
  changePassword,
  forgotPassword,
} = require("./AuthController");
const GoogleOauthController = require("./Oauth");

const router = express.Router();

router.post("/auth/signup ", validationRules(), validate, signUp);

router.post("/auth/signin", validationRules(), validate, signin);

router.put("/profile/edit", Protect, validationRules(), validate, editprofile);

router.post(
  "/profile/create",
  Protect,
  validationRules(),
  validate,
  createprofile
);

router.get("/profile", Protect, getProfile);

router.get("/user/send-verification-email", Protect, sendVerificationMail);

router.get("/user/forgot-password", forgotPassword);

router.post("/user/reset-password", changePassword);

router.get("/user/verifyemail", Protect, verifyEmail);

router.get("/google", GoogleOauthController.googleSignIn);

router.get("/auth/google-login", GoogleOauthController.getAuthorizationCode);

module.exports = router;
