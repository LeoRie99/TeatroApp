// authMiddleware.js
import jwt from 'jsonwebtoken';

const secretKey = 'TuClaveSecreta';

const authMiddleware = (req, res, next) => {
  // Verifica si existe el token en el encabezado Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autorización no proporcionado o en formato incorrecto' });
  }

  const token = authHeader.split(' ')[1]; // Obtén el token sin el prefijo 'Bearer '

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, secretKey);
    // Añade el usuario decodificado al objeto de solicitud
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token de autorización ha expirado' });
    }
    res.status(401).json({ error: 'Token de autorización inválido' });
  }
};

export { authMiddleware, secretKey };
