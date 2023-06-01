const express = require("express");

const {
  getHomePage,
  getSeachResult,
  send404,
  createTeacher,
  searchTeacher,
  sendOTP,
  verifyOTP,
} = require("../controllers/control");
const router = express.Router();
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router
  .get("/", getHomePage)
  .post(
    "/upload",
    upload.fields([
      { name: "photo", maxCount: 1 },
      { name: "routine", maxCount: 1 },
    ]),
    createTeacher
  )
  .post("/sendOTP", sendOTP)
  .get("/result/:query", searchTeacher)
  .post("/result", getSeachResult)
  .post("/validateOTP", verifyOTP)
  .get("*", send404);

module.exports = router;
