// Importar módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importar las rutas
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
// Configurar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes HTTP
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB

const MONGODB_URI = 'mongodb://localhost:27017/curso_online'; // Define MONGODB_URI aquí o en algún otro lugar antes de usarlo
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conexión a MongoDB establecida.");
}).catch(err => {
  console.error("Error al conectar a MongoDB:", err);
  process.exit(1);
});


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payment', paymentRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al sistema de venta de cursos online!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
