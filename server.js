const multer = require("multer");
const express = require("express");
const crypto = require("crypto");

require("dotenv").config();
const { STORAGE_DIRECTORY, PORT } = process.env;

// multer and express config

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, STORAGE_DIRECTORY),
  filename: (req, file, cb) => cb(null, `${crypto.randomUUID()}.png`),
});

const fileFilter = (req, file, cb) => {
  const allowedMIMEs = ["image/png"];

  if (allowedMIMEs.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const server = express();
const upload = multer({ dest: STORAGE_DIRECTORY, fileFilter, storage });

// routes

server.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    success: true,
    filename: req.file.filename,
  });
});

server.get("/images/:filename", (req, res) => {
  res.sendFile(
    `${STORAGE_DIRECTORY}${STORAGE_DIRECTORY[STORAGE_DIRECTORY.length - 1] === "/" ? "" : "/"}${
      req.params.filename
    }`
  );
});

// config

server.use(express.json());

server.listen(PORT, () => console.log(`File server running on ${PORT}`));
