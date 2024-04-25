// Middleware para verificar el rol de administrador
const verifyRole = (req, res, next) => {
    try {
      const role = req.payload.role;
      if (!role || role === "user" ) {
        return res
          .status(403)
          .send("Access Denied: Administrator permission required");
      }
      next();
    } catch (error) {
     
      return res.status(400).send("Role admin not found");
    }
  };

  module.exports= {verifyRole}