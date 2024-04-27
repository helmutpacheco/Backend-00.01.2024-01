const { Router } = require("express");
const usuarioServices = require("../services/usuario.services.js");

const routes = Router();

routes.get("/usuarios", usuarioServices.findAll);
routes.post("/usuarios", usuarioServices.createUsuario);
routes.delete("/usuarios/:id", usuarioServices.deleteUsuario);
routes.patch("/usuarios/:id", usuarioServices.updateUsuario);

module.exports = routes;
