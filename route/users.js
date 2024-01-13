// routes/users.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../backend/src/db");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await db.oneOrNone(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await db.one(
    "INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING *",
    [username, passwordHash]
  );

  res.json({ message: "User registered successfully", user: newUser });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", user_id: user.id, token });
});

module.exports = router;
