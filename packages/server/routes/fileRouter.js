const { readFileSync, writeFileSync } = require("fs");

const express = require("express");
const router = express.Router();

const { listFiles, findFileById } = require("../functions/files");

const path = "/Users/juw/Desktop/Notes/";

let cache = {
  folderPath: path,
  files: [],
};

router.get("/", (req, res) => {
  const notes = listFiles(cache.folderPath);
  res.send(notes);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const file = findFileById(id, cache.folderPath);
  res.status(202).send(file);
});

router.get("/:id/content", (req, res) => {
  const { id } = req.params;
  const file = findFileById(id, cache.folderPath);
  let fileContent = "";
  if (file.fileExt === ".png") {
    fileContent = file.filePath;
    res.status(202).send({ fileExt: file.fileExt, content: fileContent, file: file.filePath });
  } else {
    fileContent = readFileSync(file.filePath, "utf8");
    res.status(202).send({ fileExt: file.fileExt, content: fileContent, file: file.filePath });
  }
});

router.put("/:id/write", (req, res) => {
  const {
    data: { content, file },
  } = req.body;
  writeFileSync(file, content);
  res.status(202).send({ content });
});

router.post("/folderPath/write", (req, res) => {
  const {
    data: { folderPath },
  } = req.body;

  cache.folderPath = folderPath[0];

  const notes = listFiles(cache.folderPath);
  res.send(notes);
});

module.exports = router;
