const Course = require('../models/Course');

const courseController = {
  // Obtener todos los cursos
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Obtener un curso por su ID
  getCourseById: async (req, res) => {
    const { id } = req.params;
    try {
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear un nuevo curso
  createCourse: async (req, res) => {
    const courseData = req.body;
    try {
      const newCourse = new Course(courseData);
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Actualizar un curso existente
  updateCourse: async (req, res) => {
    const { id } = req.params;
    const courseData = req.body;
    try {
      const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true });
      if (!updatedCourse) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.json(updatedCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Eliminar un curso existente
  deleteCourse: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCourse = await Course.findByIdAndDelete(id);
      if (!deletedCourse) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.json({ message: 'Curso eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = courseController;
