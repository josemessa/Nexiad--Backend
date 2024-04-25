// funcion login
const User = require("../models/userModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    // Si el usuario existe
    if ( password === user.password) {    
      // Responder con éxito: estado 200
      res.status(200).json({
        status: "success",
        data: user,
      });
    } else {
      // Si la contraseña no es válida, responder con error
      return res.status(200).json({
        status: "error",
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    // En caso de error, responder con estado 400 y mensaje de error
    res.status(400).json({
      status: "error",
      message: "unsuccessful login",
      error: error.message,
    });
  }
};

module.exports = { login };
