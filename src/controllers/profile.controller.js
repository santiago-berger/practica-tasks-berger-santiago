import { matchedData } from "express-validator";
import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

// POST /api/profiles
export const createProfile = async (req, res) => {
  try {
    const { firstName, lastName, user_id } = matchedData(req);
    const profile = await Profile.create({ firstName, lastName, user_id });
    return res.status(201).json({ message: "Perfil creado con éxito", profile });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el perfil", error: error.message });
  }
};

// GET /api/profiles
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

// PUT /api/profiles/:id
export const updateProfile = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const data = matchedData(req, { locations: ["body"] });

    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });

    await profile.update(data);
    return res.status(200).json({ message: "Perfil actualizado con éxito", profile });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
  }
};

// DELETE /api/profiles/:id
export const deleteProfile = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });
    await profile.destroy();
    return res.status(200).json({ message: "Perfil eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el perfil", error: error.message });
  }
};