const express = require('express');
const cors = require("cors");
const app = express();
const db = require("./app/models");
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "¡Bienvenido a la aplicación de veterinaria de Deyvid Muñoz" });
});

// Importar y aplicar las rutas de los recursos de la veterinaria
const especieMascotaRoutes = require("./app/routes/especieMascota.routes");
const razaRoutes = require("./app/routes/raza.routes");
const sexoRoutes = require("./app/routes/sexo.routes");
const colorRoutes = require("./app/routes/color.routes");
const nacionalidadRoutes = require("./app/routes/nacionalidad.routes");
const propietarioRoutes = require("./app/routes/propietario.routes");
const mascotaRoutes = require("./app/routes/mascota.routes");

app.use("/api", especieMascotaRoutes);
app.use("/api", razaRoutes);
app.use("/api", sexoRoutes);
app.use("/api", colorRoutes);
app.use("/api", nacionalidadRoutes);
app.use("/api", propietarioRoutes);
app.use("/api", mascotaRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
