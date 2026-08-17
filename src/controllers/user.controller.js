import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

const validateUser = ({ name, email, password }) => {
  const errors = [];
  const check = (value, label) => {
    if (!value || typeof value !== "string" || value.trim() === "")
      errors.push(`El campo ${label} es obligatorio y debe ser un texto no vacío.`);
    else if (value.length > 100)
      errors.push(`El campo ${label} no puede superar los 100 caracteres.`);
  };
  check(name, "name");
  check(email, "email");
  check(password, "password");
  return errors;
};

// POST /api/users
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const errors = validateUser({ name, email, password });
    if (errors.length > 0)
      return res.status(400).json({ message: "Datos inválidos", errors });

    if (await User.findOne({ where: { email } }))
      return res.status(400).json({ message: "El email ya está registrado." });

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
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const errors = validateUser({ name, email, password });
    if (errors.length > 0)
      return res.status(400).json({ message: "Datos inválidos", errors });

    if (email !== user.email && (await User.findOne({ where: { email } })))
      return res.status(400).json({ message: "El email ya está registrado por otro usuario." });

    await user.update({ name, email, password });
    return res.status(200).json({ message: "Usuario actualizado con éxito", user });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    await user.destroy();
    return res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
  }
};