const { readdirSync, statSync } = require("fs");
const { join, extname, dirname } = require("path");
const { createHash } = require("crypto");

const readFiles = (path) => {
  const files = readdirSync(path, { withFileTypes: true });
  return files;
};

const listFiles = (path) => {
  const files = readFiles(path);
  let notes = [];
  for (const file of files) {
    if (!file.name.startsWith(".")) {
      if (file.name !== "node_modules") {
        if (file.name !== "dist") {
          const fileExt = extname(file.name);
          if (fileExt !== ".drawio") {
            const filePath = join(path, file.name);
            const isDir = statSync(filePath).isDirectory();
            notes = [
              ...notes,
              {
                id: createHash("md5").update(filePath).digest("hex"),
                fileName: file.name,
                filePath,
                isDir,
                children: isDir && listFiles(filePath),
                fileExt,
              },
            ];
            if (isDir) {
              listFiles(filePath);
            }
          }
        }
      }
    }
  }
  return notes;
};

const findFileById = (id, path) => {
  const files = listFiles(path);

  let foundFile = "";
  const findFilePathById = (files, id) => {
    for (const file of files) {
      const isDir = statSync(file.filePath).isDirectory();

      if (file.id === id) {
        foundFile = file;
      }
      if (isDir) {
        findFilePathById(file.children, id);
      }
    }
    return foundFile;
  };

  const file = findFilePathById(files, id);

  return file;
};

module.exports = { listFiles, findFileById };
