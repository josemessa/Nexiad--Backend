const mongoose = require("mongoose");

//esquema del usuario
const userSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Surname: {
    type: String,
    required: true,
  },
  Birthdate: {
    type: Date,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Subscription: {
    type: String,
    enum: ["basic", "premium"],
    default: "basic",
  },
  role: {
    type: String,
    default: "user",
  },
});

// Crear el modelo de usuario
const User = mongoose.model( "User", userSchema, "users");

// Exportar el modelo
module.exports = User;
