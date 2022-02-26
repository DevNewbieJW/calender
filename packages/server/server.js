const express = require("express");
const cors = require("cors");
const app = express();

const notes = require("./routes/fileRouter");

app.use(express.json());
app.use(cors());
app.use("/notes", notes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => "Server is listening on port 5000");
