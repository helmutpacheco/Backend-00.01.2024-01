const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const paymentRoutes = require('./routes/PaymentController');

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/CURSOS_ONLINE', {
})
.then(() => console.log('Conectado a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB:', error));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);

// Puerto de escucha del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en funcionamiento en el puerto ${PORT}`));
