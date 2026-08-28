import { body, param } from "express-validator";
import { Role } from "../../models/role.model.js";

// valida que el :id del rol sea entero positivo y que el rol exista
export const roleIdValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un entero positivo")
    .bail()
    .custom(async (id) => {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("El rol indicado no existe");
      }
      return true;
    }),
];

// validaciones para crear un rol (POST /api/roles)
export const createRoleValidation = [
  body("roleName")
    .notEmpty()
    .withMessage("El roleName es obligatorio")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El roleName debe tener entre 2 y 100 caracteres")
    .bail()
    // custom de UNICIDAD: no puede repetirse el nombre del rol
    .custom(async (roleName) => {
      const existe = await Role.findOne({ where: { roleName } });
      if (existe) {
        throw new Error("Ese rol ya existe");
      }
      return true;
    }),
];

// validaciones para actualizar un rol (PUT /api/roles/:id)
export const updateRoleValidation = [
  ...roleIdValidation,

  body("roleName")
    .optional()
    .notEmpty()
    .withMessage("El roleName no puede estar vacío")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El roleName debe tener entre 2 y 100 caracteres")
    .bail()
    .custom(async (roleName, { req }) => {
      const existe = await Role.findOne({ where: { roleName } });
      if (existe && existe.id !== Number(req.params.id)) {
        throw new Error("Ese rol ya existe");
      }
      return true;
    }),
];