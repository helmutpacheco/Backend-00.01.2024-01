const mongoose = require('mongoose');

// Define el esquema del usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Crea el modelo de usuario a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
