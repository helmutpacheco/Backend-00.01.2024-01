const { Router } = require("express");
const ubigeoServices = require("../services/ubigeo.services.js");

const routes = Router();

routes.get("/ubigeos", ubigeoServices.findAll);
routes.post("/ubigeos", ubigeoServices.createUbigeo);
routes.delete("/ubigeos/:id", ubigeoServices.deleteUbigeo);
routes.patch("/ubigeos/:id", ubigeoServices.updateUbigeo);

module.exports = routes;
