// Importar los módulos necesarios
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");
const cors= require("cors")
const PORT = 3000;

// Cargar variables de entorno desde el archivo .env
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
// Obtener la URL de conexión a la base de datos
const urlMongo = process.env.DATABASE_URL;

// Conectar a la base de datos MongoDB
mongoose.connect(urlMongo);

const db = mongoose.connection;

// Manejar eventos de conexión, error y desconexión de la base de datos MongoDB
db.on("error", (error) => {
  console.error("Error al conectar");
});

db.once("connected", () => {
  console.log("Success connected");
});

db.on("disconnected", () => {
  console.log("Mongo default connection disconnected");
});
// enrutadores
app.use("/user", userRouter);


// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`);
});


