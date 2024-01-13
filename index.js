// index.js
const express = require("express");
const db = require("./backend/src/db");
const app = express();
const port = 3000;

const notesRouter = require("./route/note");

require("dotenv").config();

app.use(express.json());

// Group routes under '/api'
const apiRouter = express.Router();
app.use("/api", apiRouter);

// Use the notes router for the '/api/notes' route
apiRouter.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
