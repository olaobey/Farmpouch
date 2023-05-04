const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.validPassword = (hashPassword, password) => {
  const comparePassword =
    typeof password == "string" &&
    password.trim() != "" &&
    password.trim().length >= 6;
  return comparePassword && bcrypt.compareSync(password, hashPassword);
};

exports.genPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0"
    );
    next();
  } else {
    req.flash("error_messages", "Please Login to continue !");
    res.redirect("/notAuthorized");
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin == 1) {
    next();
  } else {
    res.redirect("/notAuthorizedAdmin");
  }
};

exports.validateAuthInputs = (data) => {
  validateEmail(data.email);
  validatePassword(data.password);
};

exports.validateUserInputs = (req, res) => {
  // check each existing property in data for valid inputs
  if (req.body.email !== undefined) validateEmail(req.body.email);
  if (req.body.password !== undefined) validPassword(req.body.password);
};

exports.createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    }
  );
  return token;
};

exports.validationRules = () => {
  return [
    check("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email"),
    check("name")
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage("Name must be between 1 and 20 characters"),
    check("password")
      .trim()
      .isLength({ min: 6, max: 16 })
      .withMessage("Password must be between 6 and 16 characters"),
  ];
};

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const resultErrors = [];
  errors.array().map((err) => resultErrors.push({ [err.param]: err.mss }));
  resultErrors.push({ message: "Action unsuccessful" });
  resultErrors.push({ success: false });
  const errorObject = Object.assign({}, ...resultErrors);
  return res.status(422).json(errorObject);
};
