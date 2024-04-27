const { Router } = require("express");
const usuarioServices = require("../services/mascota.services.js");

const routes = Router();

routes.get("/vacunas", usuarioServices.findAll);
routes.post("/vacunas", usuarioServices.createUsuario);
routes.delete("/usuarios/:id", usuarioServices.deleteUsuario);
routes.patch("/usuarios/:id", usuarioServices.updateUsuario);

module.exports = routes;
