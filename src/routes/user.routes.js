import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserValidation, updateUserValidation, userIdValidation } from "../middlewares/validations/user.validation.js";

export const userRouter = Router();

userRouter.post("/users", createUserValidation , validate, createUser);       // POST   /api/users
userRouter.get("/users", getUsers);          // GET    /api/users
userRouter.get("/users/:id", userIdValidation, validate, getUserById);    // GET    /api/users/:id
userRouter.put("/users/:id", updateUserValidation, validate, updateUser);     // PUT    /api/users/:id
userRouter.delete("/users/:id", userIdValidation, validate, deleteUser);  // DELETE /api/users/:id