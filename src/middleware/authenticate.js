const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

// Define the middleware to authenticate the user
const auth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://your-auth0-domain/.well-known/jwks.json",
  }),
  audience: "your-audience",
  issuer: "https://your-auth0-domain/",
  algorithms: ["RS256"],
});

// Define the middleware to check the user's role
const checkRole = (role) => (req, res, next) => {
  const userRoles = req.user["https://your-namespace/roles"];
  if (userRoles && userRoles.includes(role)) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  auth,
  checkRole,
};
