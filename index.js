const express = require("express");
const app = express();
const port = 3000;

// Require the notes router
const notesRouter = require("./route/note");

// Use the notes router for the '/api/notes' route
app.use("/api/notes", notesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
