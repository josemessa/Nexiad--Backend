const User = require("../models/userModel");
const Authorization = require("../models/authorizationModel");
const sendEmail = require("../services/emailsignup");
const { generateToken } = require("../utils/util");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    console.log(user);
    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Email not registered",
      });
    }
    if (hashedPassword) {
      const payload = {
        userId: user._id,
        nombre: user.name,
        email: user.email,
        role: user.role,
      };
      const token = generateToken(payload, false);
      const tokenRefresh = generateToken(payload, true);

      return res.status(200).json({
        status: `Welcome ${user.firstname}`,
        data: user,
        token: token,
        token_refresh: tokenRefresh,
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
    const getAllUsers = await User.find()
      .populate("subscription")
      .sort({ surname: 1 });
    // Si no hay usuarios encontrados, responder con error
    if (getAllUsers.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "There are no users",
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

const addUser = async (req, res) => {
  try {
    const {
      firstname,
      surname,
      adress,
      city,
      phone,
      email,
      birthdate,
      password,
      role,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const alredyRegistered = await User.findOne({ email: email });

    if (alredyRegistered) {
      return res.status(409).json({
        status: "conflict",
        message: "El email ya está autorizado",
      });
    }
    const user = new User({
      firstname: firstname,
      surname: surname,
      adress: adress,
      city: city,
      phone: phone,
      email: email,
      birthdate: birthdate,
      password: hashedPassword,
      role: role,
    });
    await user.save();
    return res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error adding user to database",
      error: error.message,
    });
  }
};
const addUserFromLogin = async (req, res) => {
  try {
    const {
      firstname,
      surname,
      adress,
      city,
      phone,
      email,
      birthdate,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const alreadyAuthorized = await Authorization.findOne({ email: email });
    const alredyRegistered = await User.findOne({ email: email });
    if (alredyRegistered) {
      return res.status(409).json({
        status: "conflict",
        message: "El email ya está autorizado",
      });
    }
    let role = "";
    if (alreadyAuthorized) {
      role = "admin";
    } else {
      role = "user";
    }
    const user = new User({
      firstname: firstname,
      surname: surname,
      adress: adress,
      city: city,
      phone: phone,
      email: email,
      birthdate: birthdate,
      password: hashedPassword,
      role: role,
    });

    await user.save();
    // sendEmail(
    //   user.email,
    //   "Bienvenido a Nexiad",
    //   "Gracias por registrarte en NEXIAD, ya puedes comenzar a disfrutar de nuestros serviciosd"
    // );
    return res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error adding user to database",
      error: error.message,
    });
  }
};
const getMyUser = async (req, res) => {
  try {
    const payload = req.payload;
    console.log(payload);
    const userId = payload.userId;
    const myUser = await User.findById(userId).populate("subscription");
    if (!myUser) {
      res.status(204).json({
        status: "error",
        message: "user not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: myUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error when searching the user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userToDelete = await User.findByIdAndDelete(userId);
    if (!userToDelete) {
      return res.status(204).json({
        status: "success",
        message: "user not found by ID",
      });
    }
    return res.status(200).json({
      status: "User deleted successfully",
      data: userToDelete,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "User not deleted",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const theUser = await User.findById(userId).populate("subscription");
    if (!theUser) {
      res.status(204).json({
        status: "error",
        message: "user not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: theUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error when searching the user",
      error: error.message,
    });
  }
};

const disableAccess = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(204).json({
        status: "error",
        mssage: "user id does not exist",
      });
    }
    user.role = "disable";
    await user.save();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error when disable access the user",
      error: error.message,
    });
  }
};

const disableAdminAccess = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(204).json({
        status: "error",
        mssage: "user id does not exist",
      });
    }
    if (user.role === "user") {
      res.status(200).json({
        status: "error",
        message: "This user does not have admin permissions",
      });
    }
    user.role = "user";
    await user.save();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error when disable access the user",
      error: error.message,
    });
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(204).json({
        status: "error",
        message: "User id does not exist",
      });
    }

    const { firstname, surname, address, city, phone, email, birthdate } =
      req.body;

    if (firstname !== user.firstname) {
      user.firstname = firstname;
    }
    if (surname !== user.surname) {
      user.surname = surname;
    }
    if (address !== user.address) {
      user.address = address;
    }
    if (phone !== user.phone) {
      user.phone = phone;
    }
    if (email !== user.email) {
      user.email = email;
    }
    if (birthdate !== user.birthdate) {
      user.birthdate = birthdate;
    }

    await user.save();

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error when disabling access to the user",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  getUsers,
  addUser,
  addUserFromLogin,
  getMyUser,
  getUserById,
  deleteUser,
  disableAdminAccess,
  disableAccess,
  editUser,
};
