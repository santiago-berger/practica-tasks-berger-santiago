import { Router } from "express";
import { createRole, getRoles } from "../controllers/role.controller.js";
import { createRoleValidation } from "../middlewares/validations/role.validation.js";
import { validate } from "../middlewares/validate.js";

export const roleRouter = Router();

roleRouter.post("roles/", createRoleValidation, validate, createRole);   // POST /api/roles
roleRouter.get("roles/", getRoles);      // GET  /api/roles