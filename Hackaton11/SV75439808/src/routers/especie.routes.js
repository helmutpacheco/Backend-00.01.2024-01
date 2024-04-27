const { Router } = require("express");
const especieServices = require("../services/especie.services.js");

const routes = Router();

routes.get("/especies", especieServices.findAll);
routes.post("/especies", especieServices.createEspecie);
routes.delete("/especies/:id", especieServices.deleteEspecie);
routes.patch("/especies/:id", especieServices.updateEspecie);

module.exports = routes;
