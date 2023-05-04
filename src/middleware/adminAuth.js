const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin authorization required" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
};

module.exports = adminAuth;
