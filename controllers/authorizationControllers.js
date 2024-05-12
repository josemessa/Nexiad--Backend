const Authorization = require("../models/authorizationModel");
const sendEmail = require("../services/emailsignup");
const authorizeAdmin = async (req, res) => {
  try {
    const emailToAuth = req.body.email;

    const existingAuthorization = await Authorization.findOne({
      email: emailToAuth,
    });

    if (existingAuthorization) {
      return res.status(409).json({
        status: "conflict",
        message: "El email ya está autorizado",
      });
    } else {
      const newAuthorization = new Authorization({
        email: emailToAuth,
      });

      await newAuthorization.save();
      sendEmail(
        newAuthorization.email,
        "Te invitamos a gestionar!!",
        "En NEXIAD contamos contigo para administrar nuestra plataforma. Solo tienes que registrarte desde nuestra pagina de LOGIN y formaras parte de los administradores de NEXIAD. Te esperamos!"
      );
      return res.status(200).json({
        status: "success",
        message: "Email autorizado correctamente",
      });
    }
  } catch (error) {
    console.error("Error adding authorization:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al agregar autorización",
    });
  }
};

module.exports = { authorizeAdmin };
