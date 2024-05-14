const mongoose = require("mongoose");

const authorizationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Authorization = mongoose.model(
  "Authorization",
  authorizationSchema,
  "authorizations"
);

module.exports = Authorization;
