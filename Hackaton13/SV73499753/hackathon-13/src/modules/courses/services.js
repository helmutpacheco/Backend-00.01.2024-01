const { request, response } = require("express");

const CourseModel = require("./entity");

const createCourse = async (req = request, res = response) => {
  try {
    const data = req.body;

    const existCourse = await CourseModel.findOne({ name: data.name });

    if (existCourse) {
      return res.status(400).json({ message: "El curso ya existe" });
    }

    const newCourse = await CourseModel.create(data);

    newCourse.save();

    res.json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findAllCourse = async (req = request, res = response) => {
  const result = await CourseModel.find();

  res.json(result);
};

const findOneCourse = async (req = request, res = response) => {
  const { id } = req.params;

  const existCourse = await CourseModel.findById(id);
  if (!existCourse) {
    return res.status(400).json({ message: "El curso no existe" });
  }
  res.json(existCourse);
};

 


module.exports = {
  createCourse,
  findOneCourse,
  findAllCourse,
};
