import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/", createUser);       // POST   /api/users
userRouter.get("/", getUsers);          // GET    /api/users
userRouter.get("/:id", getUserById);    // GET    /api/users/:id
userRouter.put("/:id", updateUser);     // PUT    /api/users/:id
userRouter.delete("/:id", deleteUser);  // DELETE /api/users/:id