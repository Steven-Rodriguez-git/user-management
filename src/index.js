import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger_output.json' assert {type: "json"}; // Ajustar ruta según tu estructura

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, '..', 'front', 'build')));

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);


sequelize
  .sync()
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((err) => console.error("Error al sincronizar BD", err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front', 'build', 'index.html'));
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});


export default app;