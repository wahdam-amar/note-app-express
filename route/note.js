// routes/notes.js
const express = require("express");
const db = require("../backend/src/db");
const router = express.Router();

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

router.put("/:id", async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  // Validate if title is null
  if (!title) {
    return res.status(400).json({ error: "Title cannot be null" });
  }

  try {
    const updatedNote = await db.one(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, noteId]
    );

    // Enhance information on success
    res.json({
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    console.error("Error updating note in PostgreSQL", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const noteId = req.params.id;

  try {
    await db.none("DELETE FROM notes WHERE id = $1", [noteId]);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note from PostgreSQL", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
