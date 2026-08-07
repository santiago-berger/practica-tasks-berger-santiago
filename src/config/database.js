import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tasks_users_db","root","", {
    host: "localhost",
    dialect: "mysql",
  }
);

export { sequelize };