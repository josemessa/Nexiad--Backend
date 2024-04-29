// funcion login
const User = require("../models/userModel");
const { generateToken } = require("../utils/util");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Email not registered",
      });
    }
    if (password === user.password) {
      const payload = {
        userId: user._id,
        nombre: user.name,
        email: user.email,
        role: user.role
      };
      const token = generateToken(payload, false);
      const tokenRefresh = generateToken(payload, true);

      
      return res.status(200).json({
        status: `Welcome ${user.firstname}`,
        data: user,
        token: token,
        token_refresh: tokenRefresh
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

const getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find().sort({ firstname: 1 });
    // Si no hay usuarios encontrados, responder con error
    if(getAllUsers.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "There are no users",
        data: [],
      });
    }
    
    return res.status(200).json({
      status: "success",
      data: getAllUsers,
    });
  } catch (error) {
    // En caso de error, responder con estado 400 y mensaje de error
    return res.status(400).json({
      status: "error",
      message: "Error when searching for users",
      error: error.message,
    });
  }
};



module.exports = { login, getUsers };

