import "dotenv/config";
import app from "./index.js";
import sequelize from "./config/db.js";

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((err) => console.error("Error al sincronizar BD", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});
