const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  cover: String,
  price: { type: Number, required: true },
  // Otros campos según tus necesidades
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
