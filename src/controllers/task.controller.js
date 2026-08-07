import { Task } from "../models/Task.js";

const validateTask = ({ title, description, isComplete }) => {
  const errors = [];
  const check = (value, label) => {
    if (!value || typeof value !== "string" || value.trim() === "")
      errors.push(`El campo ${label} es obligatorio y debe ser un texto no vacío.`);
    else if (value.length > 100)
      errors.push(`El campo ${label} no puede superar los 100 caracteres.`);
  };
  check(title, "title");
  check(description, "description");
  if (isComplete !== undefined && typeof isComplete !== "boolean")
    errors.push("El campo isComplete debe ser un booleano (true o false).");
  return errors;
};

// POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    const errors = validateTask({ title, description, isComplete });
    if (errors.length > 0)
      return res.status(400).json({ message: "Datos inválidos", errors });

    if (await Task.findOne({ where: { title } }))
      return res.status(400).json({ message: "Ya existe una tarea con ese título." });

    const task = await Task.create({ title, description, isComplete });
    return res.status(201).json({ message: "Tarea creada con éxito", task });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la tarea", error: error.message });
  }
};

// GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las tareas", error: error.message });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la tarea", error: error.message });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    const errors = validateTask({ title, description, isComplete });
    if (errors.length > 0)
      return res.status(400).json({ message: "Datos inválidos", errors });

    if (title !== task.title && (await Task.findOne({ where: { title } })))
      return res.status(400).json({ message: "Ya existe otra tarea con ese título." });

    await task.update({ title, description, isComplete });
    return res.status(200).json({ message: "Tarea actualizada con éxito", task });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar la tarea", error: error.message });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    await task.destroy();
    return res.status(200).json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
  }
};