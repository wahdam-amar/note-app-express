const express = require("express");
const db = require("./backend/src/db");
const app = express();
const port = 3000;

const notesRouter = require("./route/note");

require("dotenv").config();

app.use(express.json());

// Use the notes router for the '/api/notes' route
app.use("/api/notes", notesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
