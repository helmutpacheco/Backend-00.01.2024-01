const express = require('express');
const path = require('path');
const comprasRoutes = require('./routes/compras');

const app = express();

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para servir el archivo JavaScript compras.js
app.get('/scripts/compras.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'routes', 'compras.js'));
});

// Ruta para servir el archivo JavaScript main.js
app.get('/scripts/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'scripts', 'main.js'));
});

// Middleware para manejar las solicitudes de favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Ruta para crear un nuevo elemento en la lista de pendientes
app.post('/crear-pendiente', comprasRoutes.crearPendiente);

// Ruta para mostrar los pendientes
app.get('/pendientes', comprasRoutes.mostrarPendientes);

// Ruta para mostrar los completados
app.get('/completados', comprasRoutes.mostrarCompletados);

// Si la ruta no coincide con ninguna de las anteriores, devolver un 404
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
