// index.js
const express = require("express");
const db = require("./backend/src/db");
const app = express();
const port = 3000;

const notesRouter = require("./route/note");
const usersRouter = require("./route/users"); // Import the users router

require("dotenv").config();

app.use(express.json());

// Group routes under '/api'
const apiRouter = express.Router();

app.use("/api", apiRouter);

apiRouter.use("/notes", notesRouter);
apiRouter.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
