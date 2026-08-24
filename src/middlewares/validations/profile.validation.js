import { body, param } from "express-validator";
import { Profile } from "../../models/profile.model.js";
import { User } from "../../models/user.model.js";

// valida que el :id del perfil sea entero positivo y que el perfil exista
export const profileIdValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un entero positivo")
    .bail()
    .custom(async (id) => {
      const profile = await Profile.findByPk(id);
      if (!profile) {
        throw new Error("El perfil indicado no existe");
      }
      return true;
    }),
];

// validaciones para crear un perfil (POST /api/profiles)
export const createProfileValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("El firstName es obligatorio")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El firstName debe tener entre 2 y 100 caracteres"),

  body("lastName")
    .notEmpty()
    .withMessage("El lastName es obligatorio")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El lastName debe tener entre 2 y 100 caracteres"),

  body("user_id")
    .notEmpty()
    .withMessage("El user_id es obligatorio")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("El user_id debe ser un entero positivo")
    .bail()
    // existencia del usuario y custom del modelo Profile (relación uno a uno)
    // un usuario no puede tener más de un perfil
    .custom(async (user_id) => {
      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error("El usuario indicado no existe");
      }
      const yaTienePerfil = await Profile.findOne({ where: { user_id } });
      if (yaTienePerfil) {
        throw new Error("Ese usuario ya tiene un perfil");
      }
      return true;
    }),
];