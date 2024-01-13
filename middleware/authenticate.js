// middleware/authenticate.js
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const db = require("../backend/src/db");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [
      decoded.userId,
    ]);

    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    req.user = user; // Attach the user object to the request for future use
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};
