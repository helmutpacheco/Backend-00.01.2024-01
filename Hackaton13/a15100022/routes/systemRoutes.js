const express = require('express');
const router = express.Router();
const UserModel = require('../models/User'); // Importar el modelo de usuario si estás utilizando Mongoose

// Ruta del sistema - Raíz
router.get('/', (req, res) => {
  res.send('¡Ruta del sistema!');
});

// Ruta del sistema - Obtener información del usuario por ID
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    // Buscar el usuario por su ID en la base de datos
    const user = await UserModel.findById(userId);
    if (!user) {
      // Si no se encuentra el usuario, devolver un mensaje de error
      return res.status(404).send('Usuario no encontrado');
    }
    // Si se encuentra el usuario, devolverlo como respuesta
    res.json(user);
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta del sistema - Actualizar información del usuario por ID
router.put('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const newData = req.body; // Nuevos datos para actualizar el usuario

  try {
    // Buscar y actualizar el usuario por su ID en la base de datos
    const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, { new: true });
    
    if (!updatedUser) {
      // Si no se encuentra el usuario, devolver un mensaje de error
      return res.status(404).send('Usuario no encontrado');
    }

    // Si se actualiza correctamente, devolver el usuario actualizado como respuesta
    res.json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar información del usuario:", error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta del sistema - Eliminar usuario por ID
router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    // Eliminar el usuario por su ID en la base de datos
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      // Si no se encuentra el usuario, devolver un mensaje de error
      return res.status(404).send('Usuario no encontrado');
    }

    // Si se elimina correctamente, devolver el usuario eliminado como respuesta
    res.json(deletedUser);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta del sistema - Crear un nuevo usuario
router.post('/user', async (req, res) => {
  const userData = req.body; // Datos para crear el nuevo usuario

  try {
    // Crear un nuevo usuario en la base de datos
    const newUser = await UserModel.create(userData);
    res.status(201).json(newUser); // Devolver el nuevo usuario creado como respuesta
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta del sistema - Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    // Buscar todos los usuarios en la base de datos
    const users = await UserModel.find();
    res.json(users); // Devolver los usuarios como respuesta en formato JSON
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send('Error interno del servidor');
  }
});

// Otras rutas del sistema aquí...

module.exports = router;
