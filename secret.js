const crypto = require("crypto");

const secret = "frase para codificar";

const hash = crypto
  .createHmac("sha256", secret)
  .update("frase para aumentar seguridad")
  .digest("hex");

console.log(hash);