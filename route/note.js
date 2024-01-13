// routes/notes.js
const express = require("express");
const db = require("../backend/src/db");
const router = express.Router();

const notes = [];

router.get("/", async (req, res) => {
  try {
    const notes = await db.any("SELECT * FROM notes");

    if (notes.length === 0) {
      res.status(404).json({ message: "No notes found" });
    } else {
      res.json(notes);
    }
  } catch (error) {
    console.error("Error fetching notes from PostgreSQL", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;

  console.log(req.body);

  try {
    const newNote = await db.one(
      "INSERT INTO notes(title, content) VALUES($1, $2) RETURNING *",
      [title, content]
    );
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error inserting note into PostgreSQL", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
