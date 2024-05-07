const mongoose = require('mongoose');
const { DB_URL } = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase');
        console.log('Conectado a la base de datos MongoDB');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
};

module.exports = connectDB;