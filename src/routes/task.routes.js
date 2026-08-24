import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.post("tasks/", createTask);       // POST   /api/tasks
taskRouter.get("tasks/", getTasks);          // GET    /api/tasks
taskRouter.get("tasks/:id", getTaskById);    // GET    /api/tasks/:id
taskRouter.put("tasks/:id", updateTask);     // PUT    /api/tasks/:id
taskRouter.delete("tasks/:id", deleteTask);  // DELETE /api/tasks/:id