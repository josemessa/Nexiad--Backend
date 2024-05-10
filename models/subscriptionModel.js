const mongoose = require('mongoose');


const subscriptionSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    duracion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    beneficios: {
      type: [String],
      required: true,
    },
  });


  const Subscription = mongoose.model('Subscription', subscriptionSchema);

  module.exports = Subscription;

