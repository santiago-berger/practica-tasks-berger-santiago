import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import { matchedData } from "express-validator";

// POST /api/users
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = matchedData(req);
    const user = await User.create({ name, email, password });
    return res.status(201).json({ message: "Usuario creado con éxito", user });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
};

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
      include: [
        { model: Task, as: "tasks", attributes: ["id", "title", "description", "isComplete"] },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

// GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email"],
      include: [
        { model: Task, as: "tasks", attributes: ["id", "title", "description", "isComplete"] },
      ],      
    });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = matchedData(req);

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update({ name, email, password });
    return res.status(200).json({ message: "Usuario actualizado con éxito", user });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    await user.destroy();
    return res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
  }
};