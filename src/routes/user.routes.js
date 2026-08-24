import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/users", createUser);       // POST   /api/users
userRouter.get("/users", getUsers);          // GET    /api/users
userRouter.get("/users/:id", getUserById);    // GET    /api/users/:id
userRouter.put("/users/:id", updateUser);     // PUT    /api/users/:id
userRouter.delete("/users/:id", deleteUser);  // DELETE /api/users/:id