let GLOBAL_OTP = "";
const Teacher = require("../models/teacher");

async function getHomePage(req, res) {
  return res.render("index", { error: "" });
}

async function getSeachResult(req, res) {
  query = req.body.query;
  // console.log(query);
  return res.redirect(`/result/${query}`);
}

async function send404(req, res) {
  return res.status(404).render("404");
}

async function createTeacher(req, res) {
  const body = req.body;
  const files = req.files;

  const dp = files["photo"][0].path.replace("public", "");
  const rp = files["routine"][0].path.replace("public", "");

  try {
    const result = await Teacher.create({
      full_name: body.full_name,
      eid: body.eid,
      department: body.department,
      email: body.email,
      photo_path: dp,
      routine_path: rp,
    });
    return res.status(201).redirect("/");
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .render("index", { error: "EID or Email already exists" });
    }
    console.log(err.message);
  }
}

async function searchTeacher(req, res) {
  const teacher = await Teacher.find({
    $or: [{ full_name: req.params.query }, { eid: req.params.query }],
  }).catch((err) => {
    return res.status(404).json({
      status: err.message,
    });
  });

  return res.render("search-result", { data: teacher });
}

const nodemailer = require("nodemailer");

async function verifyOTP(req, res) {
  const enteredOTP = req.body.otp;
  console.log(req.body);
  console.log("Global OTP", GLOBAL_OTP);
  if (enteredOTP != GLOBAL_OTP) {
    return res.status(400).json({ status: "failed" });
  }

  return res.status(200).json({ status: "success" });
}

async function sendOTP(req, res) {
  const email = req.body.email;
  // console.log(process.env.ADMIN_EMAIL, process.env.ADMIN_EMAIL_PASSWORD);
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  // const ADMIN_EMAIL_PASSWORD = process.env.ADMIN_EMAIL_PASSWORD;
  // const transport = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: ADMIN_EMAIL,
  //     pass: ADMIN_EMAIL_PASSWORD,
  //   },
  // });
  // console.log(transport);
  let OTP = Math.floor(Math.random() * 899999 + 100000);
  GLOBAL_OTP = OTP;
  console.log("Global OTP", GLOBAL_OTP);

  // const mailOptions = {
  //   from: "noreply@teacherHub.com",
  //   to: email,
  //   subject: "OTP Message from ",
  //   text: `Your One-Time Password is : ${OTP}`,
  // };

  // transport.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("email sent" + info.response);
  //   }
  // });
  return res.status(200);
}

module.exports = {
  getHomePage,
  getSeachResult,
  send404,
  createTeacher,
  searchTeacher,
  sendOTP,
  verifyOTP,
};
