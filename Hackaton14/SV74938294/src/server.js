const express = require('express');
const path = require('path');
const connectToDatabase = require('../database/dbConfig.js');
const User = require('./models/User');
// Definir el modelo de mensaje con Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true }, // Nuevo campo para el receptor del mensaje
  timestamp: { type: Date, default: Date.now }
});


const Message = mongoose.model('Message', messageSchema);



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.use(express.json());

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Ruta para cargar la página de inicio de sesión
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/chat.html'));
});

app.post('/api/messages', async (req, res) => {
  try {
      const { content, sender } = req.body;
      let response;
      console.log("Este es el valor content: " + content);

      // Analizar el mensaje del usuario y generar la respuesta correspondiente
      if (content === 'hola') {
          response = 'Hola soy Bags!, un gusto';
      } else if (content === 'menu') {
          response = 'Perfecto! para más información comunícate con Deyvid Muñoz al 941456260 o a www.obrafood.com.pe';
      } else {
          response = 'Entiendo tu requerimiento, para darte un mejor servicio comunícate al asesor Deyvid Muñoz al número: 941456260, Gracias!';
      }

      // Guardar el mensaje del usuario y la respuesta del bot en la base de datos
      const userMessage = new Message({ content, sender, receiver: 'bot' });
      await userMessage.save();

      const botMessage = new Message({ content: response, sender: 'bot', receiver: sender });
      await botMessage.save();

      // Enviar la respuesta al cliente
      res.status(200).json({ message: response });
  } catch (error) {
      console.error('Error al procesar el mensaje:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.delete('/api/messages', async (req, res) => {
  try {
      const { receiver } = req.body;
      // Eliminar todos los mensajes del usuario de la base de datos
      await Message.deleteMany({ receiver: receiver });
      res.status(200).json({ message: 'Mensajes del usuario eliminados correctamente' });
  } catch (error) {
      console.error('Error al borrar los mensajes del usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});


// En la ruta del servidor que maneja la carga inicial del historial de chat
app.get('/api/messages/:username', async (req, res) => {
try {
    const { username } = req.params;

    // Recuperar los mensajes del usuario de la base de datos
    const messages = await Message.find({ sender: username });

    // Enviar los mensajes al cliente
    res.status(200).json(messages);
} catch (error) {
    console.error('Error al recuperar mensajes del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
}
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Busca el usuario en la base de datos por su nombre de usuario y contraseña
    const user = await User.findOne({ username, password });

    if (user) {
      // Usuario autenticado correctamente
      res.status(200).json({ message: 'Inicio de sesión exitoso', username: username });
    } else {
      // Credenciales incorrectas
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

  

// Ruta para crear un nuevo usuario
app.post('/api/users', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el nombre de usuario ya existe en la base de datos
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Crear un nuevo usuario utilizando el modelo de usuario
    const newUser = new User({ username, password });
    await newUser.save();

    // Devolver el nuevo usuario creado
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear un nuevo usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
