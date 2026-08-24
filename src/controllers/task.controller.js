import { matchedData } from "express-validator";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

// POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, user_id } = matchedData(req);
    const task = await Task.create({ title, description, isComplete });
    return res.status(201).json({ message: "Tarea creada con éxito", task });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la tarea", error: error.message });
  }
};

// GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: "author", attributes: ["id", "name", "email"] },
      ],
    });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las tareas", error: error.message });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const task = await Task.findByPk(id, {
      include: [
        { model: User, as: "author", attributes: ["id", "name", "email"] },
      ],   
    });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la tarea", error: error.message });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const { title, description, isComplete } = matchedData(req);

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    await task.update({ title, description, isComplete });
    return res.status(200).json({ message: "Tarea actualizada con éxito", task });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar la tarea", error: error.message });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    await task.destroy();
    return res.status(200).json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
  }
};