import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

// POST /api/profiles -> crea un perfil relacionado con un usuario (uno a uno)
export const createProfile = async (req, res) => {
  try {
    const { firstName, lastName, user_id } = req.body;

    if (!firstName || !lastName)
      return res.status(400).json({ message: "firstName y lastName son obligatorios." });

    if (!user_id)
      return res.status(400).json({ message: "El user_id es obligatorio." });

    const user = await User.findByPk(user_id);
    if (!user)
      return res.status(404).json({ message: "El usuario indicado no existe." });

    // Un usuario solo puede tener un perfil.
    if (await Profile.findOne({ where: { user_id } }))
      return res.status(400).json({ message: "Ese usuario ya tiene un perfil." });

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