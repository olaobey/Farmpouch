const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === requiredRole) {
      // The user has the required role, so proceed with the request
      next();
    } else {
      // The user does not have the required role, so return an error response
      res.status(403).json({
        message: "You do not have permission to access this resource",
      });
    }
  };
};

module.exports = checkRole;
