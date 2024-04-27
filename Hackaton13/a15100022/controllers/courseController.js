const Course = require('../models/Course');

// Obtener todos los cursos
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cursos' });
  }
};

// Obtener un curso por su ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el curso' });
  }
};

// Crear un nuevo curso
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el curso' });
  }
};

// Actualizar un curso existente
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el curso' });
  }
};

// Eliminar un curso existente
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.status(200).json({ message: 'Curso eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el curso' });
  }
};
// Obtener todos los cursos disponibles
exports.getAvailableCourses = async (req, res) => {
  try {
    const availableCourses = await Course.find({ disponible: true });
    res.status(200).json(availableCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cursos disponibles' });
  }
};

// Obtener todos los cursos no disponibles
exports.getUnavailableCourses = async (req, res) => {
  try {
    const unavailableCourses = await Course.find({ disponible: false });
    res.status(200).json(unavailableCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cursos no disponibles' });
  }
};