const jwt=require("jsonwebtoken")


  // Middleware para verificar el token de autenticación
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Acceso denegado: No se proporcionó token"); // Si no hay token, se devuelve un error de acceso denegado
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.TOKEN_SECRET); // Intenta verificar el token con la clave secreta principal
    req.payload = payload;
     // Si la verificación es exitosa, se guarda el payload en la solicitud
    next(); // Continua con el siguiente middleware o controlador
  } catch (error) {
    try {
      payload = jwt.verify(token, process.env.TOKEN_REFRESH); // Si la verificación anterior falla, intenta verificar con la clave de refresco
      req.payload = payload;
      next();
    } catch (error) {
      return res.status(400).send("Token inválido"); // Si ambos intentos fallan, se devuelve un error de token inválido
    }
  }
};
  module.exports= { verifyToken}