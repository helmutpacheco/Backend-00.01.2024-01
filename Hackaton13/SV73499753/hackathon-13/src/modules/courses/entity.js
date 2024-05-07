const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  frontPage: String,
  price: Number,
});

const CourseModel = mongoose.model("Course", CourseSchema);

module.exports = CourseModel;
