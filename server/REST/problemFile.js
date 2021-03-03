const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const bodyParser = require("body-parser");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/problemFiles");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
router.use(bodyParser.json());
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/vnd.rar" ||
    file.mimetype === "application/zip"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  // to put filter, unComment next line
  // fileFilter: fileFilter,
});

const Problem = require("../models/Problem");

router.post("/", upload.single("problemFile"), (req, res, next) => {
  Problem.findById(req.body.id)
    .then(async (result) => {
      if (result.fileURL) {
        await removeFile(result.fileURL);
      }
      Problem.findByIdAndUpdate(req.body.id, { fileURL: req.file.path })
        .then((result) => {
          res.status(201).json({
            message: "File Uploaded Successfully",
            result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/removeFile", (req, res, next) => {
  try {
    removeFile(req.body.fileURL);
    res.status(200).json({
      message: "Deleted Succesfully",
    });
  } catch (err) {
    console.log(err);
  }
});

const removeFile = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

module.exports = router;
