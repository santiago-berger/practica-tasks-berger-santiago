import express from "express";
import { sequelize } from "./src/config/database.js";
import { userRouter } from "./src/routes/userRoutes.js";
import { taskRouter } from "./src/routes/taskRoutes.js";
import { User } from "./src/models/User.js";
import { Task } from "./src/models/Task.js";

const app = express();
const PORT = 3000;

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