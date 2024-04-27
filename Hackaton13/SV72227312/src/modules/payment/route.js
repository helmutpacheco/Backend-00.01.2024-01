const { Router } = require("express");
const { paymentProcess } = require("./services");

const routes = Router();

routes.post("/",paymentProcess);

module.exports = routes;