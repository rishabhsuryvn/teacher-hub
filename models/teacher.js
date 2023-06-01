const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    eid: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo_path: { type: String, required: true, unique: false },
    routine_path: { type: String, required: true, unique: false },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("teachers", teacherSchema);

module.exports = Teacher;
