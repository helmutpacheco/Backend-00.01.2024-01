const express = require('express');
const http = require('http');
const path = require('path'); // Importar el módulo 'path' para trabajar con rutas de archivos
const connectDB = require('./db');
const messageRoutes = require('./routes/messageRoutes');
const socketSetup = require('./socket');
const { PORT } = require('./config');

const app = express();
const server = http.createServer(app);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/messages', messageRoutes);
app.use('/', messageRoutes);


// Establecer la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

socketSetup(server);

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
