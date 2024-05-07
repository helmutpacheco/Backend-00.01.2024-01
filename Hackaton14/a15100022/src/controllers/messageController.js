const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require('../models/messageModel');


// Obtener todos los mensajes (filtrando los mensajes eliminados)
// Controlador para obtener todos los mensajes
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
};

// Enviar un nuevo mensaje
exports.postMessage = async (req, res) => {
    const { sender, message } = req.body;
    try {
        const newMessage = new Message({ sender, message });
        await newMessage.save();
        res.status(201).send('Mensaje enviado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al enviar mensaje');
    }
};

// Controlador para eliminar un mensaje
exports.deleteMessage = async (req, res) => {
    const messageId = req.params.id;
    try {
        await Message.findByIdAndDelete(messageId);
        res.json({ message: 'Mensaje eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el mensaje' });
    }
};

// Borrar historial de mensajes
exports.clearHistory = async (req, res) => {
    try {
        await Message.deleteMany({}); // Borra todos los documentos en la colección de mensajes
        res.sendStatus(204); // No Content
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al borrar historial de mensajes.');
    }
};
exports.editMessage = async (req, res) => {
    const messageId = req.params.id;
    const updatedMessage = req.body.updatedMessage;
  
    try {
      console.log('ID del mensaje a editar:', messageId);
      console.log('Nuevo mensaje:', updatedMessage);
  
      const result = await Message.updateOne(
        { _id: messageId }, // No es necesario convertir a ObjectId
        { $set: { message: updatedMessage } }
      );
  
      if (result.nModified === 0) {
        console.log('Mensaje no encontrado');
        return res.status(404).json({ message: 'Message not found' });
      }
  
      console.log('Mensaje actualizado correctamente');
      return res.status(200).json({ message: 'Message updated successfully' });
    } catch (error) {
      console.error('Error al actualizar el mensaje:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  