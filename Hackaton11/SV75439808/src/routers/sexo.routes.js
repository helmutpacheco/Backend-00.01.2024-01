const { Router } = require("express");
const sexoServices = require("../services/sexo.services.js");

const routes = Router();

routes.get("/sexos", sexoServices.findAll);
routes.post("/sexos", sexoServices.createSexo);
routes.delete("/sexos/:id", sexoServices.deleteSexo);
routes.patch("/sexos/:id", sexoServices.updateSexo);

module.exports = routes;
