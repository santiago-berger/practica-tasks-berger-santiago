import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { createTaskValidation, taskIdValidation, updateTaskValidation } from "../middlewares/validations/task.validation.js";
import { validate } from "../middlewares/validate.js";

export const taskRouter = Router();

taskRouter.post("tasks/", createTaskValidation, validate ,createTask);       // POST   /api/tasks
taskRouter.get("tasks/", getTasks);          // GET    /api/tasks
taskRouter.get("tasks/:id", taskIdValidation, validate ,getTaskById);    // GET    /api/tasks/:id
taskRouter.put("tasks/:id", updateTaskValidation, validate ,updateTask);     // PUT    /api/tasks/:id
taskRouter.delete("tasks/:id", taskIdValidation, validate ,deleteTask);  // DELETE /api/tasks/:id