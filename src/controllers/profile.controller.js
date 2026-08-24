import { matchedData } from "express-validator";
import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

// POST /api/profiles -> crea un perfil relacionado con un usuario (uno a uno)
export const createProfile = async (req, res) => {
  try {
    const { firstName, lastName, user_id } = matchedData(req);
    const profile = await Profile.create({ firstName, lastName, user_id });
    return res.status(201).json({ message: "Perfil creado con éxito", profile });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el perfil", error: error.message });
  }
};

// GET /api/profiles -> todos los perfiles con su usuario (eager loading)
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      attributes: ["id", "firstName", "lastName"],
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
      ],
    });
    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los perfiles", error: error.message });
  }
};