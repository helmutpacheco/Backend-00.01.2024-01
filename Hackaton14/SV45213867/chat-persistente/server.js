// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Importa el módulo 'path' de Node.js

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configura Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Manejar conexiones de clientes
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Manejar mensajes del cliente
  socket.on('message', (message) => {
    console.log('Mensaje recibido:', message);
    // Aquí puedes guardar el mensaje en la base de datos o en un archivo
    io.emit('message', message); // Emitir el mensaje a todos los clientes
  });

  // Manejar acciones adicionales, como borrar historial
  socket.on('clear history', () => {
    // Lógica para borrar el historial de mensajes
    console.log('Historial de mensajes borrado');
    // Aquí puedes borrar el historial de la base de datos o del archivo
    io.emit('history cleared');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
