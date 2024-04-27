const { Router } = require("express");
const nacionalidadServices = require("../services/nacionalidad.services.js");

const routes = Router();

routes.get("/nacionalidades", nacionalidadServices.findAll);
routes.post("/nacionalidades", nacionalidadServices.createnacioNalidad);
routes.delete("/nacionalidades/:id", nacionalidadServices.deleteNacionalidad);
routes.patch("/nacionalidades/:id", nacionalidadServices.updateNacionalidad);

module.exports = routes;
