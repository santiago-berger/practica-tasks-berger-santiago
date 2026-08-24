import { matchedData } from "express-validator";
import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";

// POST /api/roles crea un rol
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