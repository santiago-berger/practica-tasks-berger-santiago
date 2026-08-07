import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.post("/", createTask);       // POST   /api/tasks
taskRouter.get("/", getTasks);          // GET    /api/tasks
taskRouter.get("/:id", getTaskById);    // GET    /api/tasks/:id
taskRouter.put("/:id", updateTask);     // PUT    /api/tasks/:id
taskRouter.delete("/:id", deleteTask);  // DELETE /api/tasks/:id