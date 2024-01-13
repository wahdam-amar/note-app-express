// routes/notes.js
const express = require("express");
const router = express.Router();

const notes = [];

router.get("/", (req, res) => {
  res.json(notes);
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  const newNote = { title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

module.exports = router;
