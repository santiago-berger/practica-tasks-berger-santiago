import { body, param } from "express-validator";
import { Task } from "../../models/task.model.js";
import { User } from "../../models/user.model.js";

// valida que el :id de la tarea sea entero positivo y que la tarea exista
export const taskIdValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un entero positivo")
    .bail()
    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error("La tarea indicada no existe");
      }
      return true;
    }),
];

// validaciones para crear una tarea (POST /api/tasks)
export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("El title es obligatorio")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("El title debe tener entre 3 y 100 caracteres")
    .bail()
    // unicidad porque no puede haber dos tareas con el mismo título
    .custom(async (title) => {
      const existe = await Task.findOne({ where: { title } });
      if (existe) {
        throw new Error("Ya existe una tarea con ese título");
      }
      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("La description es obligatoria")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("La description debe tener entre 3 y 100 caracteres"),

  // custom del modelo Task: isComplete es opcional, pero si viene debe ser booleano
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("El campo isComplete debe ser booleano (true o false)"),

  body("user_id")
    .notEmpty()
    .withMessage("El user_id es obligatorio")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("El user_id debe ser un entero positivo")
    .bail()
    // custom de existencia: la tarea no puede pertenecer a un usuario inexistente
    .custom(async (user_id) => {
      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error("El usuario indicado no existe");
      }
      return true;
    }),
];

// validaciones para actualizar (PUT /api/tasks/:id)
export const updateTaskValidation = [
  ...taskIdValidation,

  body("title")
    .optional()
    .notEmpty()
    .withMessage("El title es obligatorio")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("El title debe tener entre 3 y 100 caracteres")
    .bail()
    // hay error solo si el título ya existe Y pertenece a una tarea distinta a la actual
    .custom(async (title, { req }) => {
      const existe = await Task.findOne({ where: { title } });
      if (existe && existe.id !== Number(req.params.id)) {
        throw new Error("Ya existe otra tarea con ese título");
      }
      return true;
    }),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("La description es obligatoria")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("La description debe tener entre 3 y 100 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("El campo isComplete debe ser booleano (true o false)"),
];