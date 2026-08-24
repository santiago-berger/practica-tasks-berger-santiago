import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";

// valida que el :id de la URL sea entero positivo y que el usuario exista en la bd
export const userIdValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un entero positivo")
    .bail() // si falla lo anterior, no ejecuta el custom
    .custom(async (id) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("El usuario indicado no existe");
      }
      return true;
    }),
];

// validaciones para crear un usuario (POST /api/users)
export const createUserValidation = [
  body("name")
    .notEmpty()
    .withMessage("El name es obligatorio")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El name debe tener entre 2 y 100 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email debe tener un formato válido")
    .bail()
    // custom de UNICIDAD: consulta la BD y rechaza si el email ya existe
    .custom(async (email) => {
      const existe = await User.findOne({ where: { email } });
      if (existe) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La password es obligatoria")
    .bail()
    // custom del modelo User: mínimo 6 caracteres
    .isLength({ min: 6, max: 100 })
    .withMessage("La password debe tener al menos 6 caracteres"),
];

// Validaciones para actualizar (PUT /api/users/:id).
export const updateUserValidation = [
  ...userIdValidation,

  body("name")
    .notEmpty()
    .withMessage("El name es obligatorio")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El name debe tener entre 2 y 100 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email debe tener un formato válido")
    .bail()
    // unicidad ignorando al usuario que se esta editando (req sirve para leer el :id)
    .custom(async (email, { req }) => {
      const existe = await User.findOne({ where: { email } });
      if (existe && existe.id !== Number(req.params.id)) {
        throw new Error("El email ya está registrado por otro usuario");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La password es obligatoria")
    .bail()
    .isLength({ min: 6, max: 100 })
    .withMessage("La password debe tener al menos 6 caracteres"),
];