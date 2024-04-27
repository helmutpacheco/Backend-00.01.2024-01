const { Router } = require("express");
const vacunaServices = require("../services/vacunas.services.js");

const routes = Router();

routes.get("/vacunas", vacunaServices.findAll);
routes.post("/vacunas", vacunaServices.createVacuna);
routes.delete("/vacunas/:id", vacunaServices.deleteVacuna);
routes.patch("/vacunas/:id", vacunaServices.updateVacuna);

module.exports = routes;
