const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Acceso denegado: No se proporcionó token");
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = payload;

    next();
  } catch (error) {
    try {
      payload = jwt.verify(token, process.env.TOKEN_REFRESH);
      req.payload = payload;
      next();
    } catch (error) {
      return res.status(400).send("Token inválido");
    }
  }
};
module.exports = { verifyToken };
