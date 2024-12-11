import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import healthRoutes from "./routes/health.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger_output.json' assert {type: "json"}; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'front', 'build')));

app.use("/auth", authRoutes);
app.use(healthRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front', 'build', 'index.html'));
});

export default app;