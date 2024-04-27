const { Router } = require("express");
const propietarioServices = require("../services/propietario.services.js");

const routes = Router();

routes.get("/propietarios", propietarioServices.findAll);
routes.post("/propietarios", propietarioServices.createPropietario);
routes.delete("/propietarios/:id", propietarioServices.deletePropietario);
routes.patch("/propietarios/:id", propietarioServices.updatePropietario);

module.exports = routes;
