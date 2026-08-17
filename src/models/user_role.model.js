import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";
import { Role } from "./role.model.js";

export const UserRole = sequelize.define(
  "UserRole",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { tableName: "user_roles", timestamps: false }
);

// un usuario tiene muchos roles y un rol lo tienen muchos usuarios.
User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id", as: "roles" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id", as: "users" });