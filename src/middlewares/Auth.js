const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Unauthorized, JWT Token is required",
    });
  }

  const token = auth.split(" ")[1]; // 🔥 Extract only the token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized, JWT token wrong or expired",
    });
  }
};

module.exports = ensureAuthenticated;
