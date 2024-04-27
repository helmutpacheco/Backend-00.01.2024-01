const { Router } = require("express");
const razaServices = require("../services/raza.services.js");

const routes = Router();

routes.get("/razas", razaServices.findAll);
routes.post("/razas", razaServices.createRaza);
routes.delete("/razas/:id", razaServices.deleteRaza);
routes.patch("/razas/:id", razaServices.updateRaza);

module.exports = routes;
