import { matchedData } from "express-validator";
import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";

// POST /api/roles
export const createRole = async (req, res) => {
  try {
    const { roleName } = matchedData(req);
    const role = await Role.create({ roleName });
    return res.status(201).json({ message: "Rol creado con éxito", role });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el rol", error: error.message });
  }
};

// GET /api/roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ["id", "roleName"],
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "email"],
          through: { attributes: [] }, // oculta la tabla intermedia en la respuesta
        },
      ],
    });
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los roles", error: error.message });
  }
};

// PUT /api/roles/:id
export const updateRole = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const data = matchedData(req, { locations: ["body"] });

    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ message: "Rol no encontrado" });

    await role.update(data);
    return res.status(200).json({ message: "Rol actualizado con éxito", role });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el rol", error: error.message });
  }
};

// DELETE /api/roles/:id
export const deleteRole = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ message: "Rol no encontrado" });
    await role.destroy();
    return res.status(200).json({ message: "Rol eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el rol", error: error.message });
  }
};