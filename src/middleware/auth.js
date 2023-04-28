const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json("No Authentication Provided");
  }

  const [, token] = bearer.split(" "); // destructuring
  if (!token) {
    return res.status(401).json("Bearer has no token");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json("Invalid Token Provided");
  }
};

module.exports = protect;
