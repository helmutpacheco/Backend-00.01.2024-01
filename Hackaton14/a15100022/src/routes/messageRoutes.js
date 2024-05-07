const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Rutas para mensajes
// Rutas para mensajes
router.get('/messages', messageController.getAllMessages);
router.post('/messages', messageController.postMessage);
router.put('/message/:id', messageController.editMessage); // Ruta para editar un mensaje
router.delete('/messages/:id', messageController.deleteMessage); // Ruta para eliminar un mensaje
router.delete('/clear-history', messageController.clearHistory); // Esta es la ruta para borrar todo el historial

module.exports = router;