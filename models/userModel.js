const mongoose = require("mongoose");

//esquema del usuario
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  adress:{
    type: String,    
    default: "Direccion no disponible"
  },
  city:{
    type: String,
    default: "Ciudad no disponible"
  },
  phone:{
    type: String,
    required: true
  },
  subscription: {
    type: String,
    enum: ["basic", "premium","free"],
    default: "free",
  },
  role: {
    type: String,
    default: "user",
  },
});

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema, 'users');

// Exportar el modelo
module.exports = User;
