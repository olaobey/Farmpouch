const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const routers = require("../src/api/routes/index");
const flash = require("connect-flash");
const corsOptions = { credentials: true, origin: process.env.URL || "*" };

const app = express();

// Configuring dotenv
dotenv.config();

const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`);
  next();
};

// Middleware Configuration for parse request body and cookies
app.use(express.json());

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(csrf());

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());

app.use(cors(corsOptions));

app.use(cookieParser("secret"));

app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: new MySQLStore({
      host: localhost,
      port: 3306,
      database: "cookie_user",
    }),
    resave: false,
    saveUninitialized: false,
    // setting the max age to longer duration
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(function (req, res, next) {
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");
  res.locals.error = req.flash("error");
  next();
});

app.use(customLogger("custom-logger"));

app.use("api/v1", routers);

module.exports = app;
