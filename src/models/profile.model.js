import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

export const Profile = sequelize.define(
  "Profile",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING(100), allowNull: false },
    lastName: { type: DataTypes.STRING(100), allowNull: false },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: "users", key: "id" },
    },
  },
  { tableName: "profiles", timestamps: false }
);

// un usuario tiene un perfil
Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasOne(Profile, { foreignKey: "user_id", as: "profile" });