import { validationResult } from "express-validator";

// el middleware reutilizable revisa si express-validator acumuló errores en el req
// si hay errores corta con 400 y devuelve la lista
// si no next() sigue al controlador
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // formatea cada error como campo: mensaje
    const formateados = errors.formatWith((err) => `${err.path}: ${err.msg}`);
    return res.status(400).json({
      message: "Errores de validación",
      errors: formateados.array(),
    });
  }

  next();
};