import express from "express";
import sequelize from "./../config/db.js";

const router = express.Router();

router.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      dbConnection: "ok",
    });
  } catch (error) {
    console.error("Error de conexión a la BD:", error);
    res.status(503).json({
      status: "error",
      timestamp: new Date().toISOString(),
      dbConnection: "fail",
    });
  }
});

export default router;