import { Router } from "express";
import { createRole, deleteRole, getRoles, updateRole } from "../controllers/role.controller.js";
import { createRoleValidation, roleIdValidation, updateRoleValidation } from "../middlewares/validations/role.validation.js";
import { validate } from "../middlewares/validate.js";
import { updateProfile } from "../controllers/profile.controller.js";

export const roleRouter = Router();

roleRouter.post("/roles", createRoleValidation, validate, createRole);
roleRouter.get("/roles", getRoles);
roleRouter.put("/roles/:id", updateRoleValidation, validate, updateRole);
roleRouter.delete("/roles/:id", roleIdValidation, validate, deleteRole);