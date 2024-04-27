const User = require('../models/User');

const userController = {
  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Obtener un usuario por su ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear un nuevo usuario
  createUser: async (req, res) => {
    const userData = req.body;
    try {
      const newUser = new User(userData);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Actualizar un usuario existente
  updateUser: async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Eliminar un usuario existente
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;
