import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { User } from "./src/models/user.model.js";
import { Task } from "./src/models/task.model.js";

// carga las variables de entorno .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");

    await sequelize.sync();
    console.log("Modelos sincronizados con la base de datos.");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error.message);
  }
};

startServer();