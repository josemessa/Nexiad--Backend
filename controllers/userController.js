// funcion login
const User = require("../models/userModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ Email: email });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Email not registered",
      });
    }

    // Compara la contraseña proporcionada con la basede datos
    if (password === user.Password) {
      // Inicio de sesión exitoso
      return res.status(200).json({
        status: `Welcome ${user.Firstname}`,
        data: user,
      });
    } else {
      // Contraseña incorrecta
      return res.status(401).json({
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
