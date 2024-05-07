const mongoose = require('mongoose');

// URL de conexión a tu base de datos MongoDB
const url = 'mongodb://localhost:27017'; // Cambia localhost y el puerto si es necesario

// Nombre de la base de datos que vamos a utilizar
const dbName = 'chatApp'; // Cambia "chatApp" por el nombre que desees

// Función para conectar a la base de datos utilizando Mongoose
async function connectToDatabase() {
  try {
    // Conectar a la base de datos utilizando Mongoose
    await mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Conexión establecida correctamente a la base de datos ' + dbName);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = connectToDatabase;

