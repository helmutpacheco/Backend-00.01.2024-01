const { Router } = require("express");
const { createOrder, allOrders } = require("./services");

const routes = Router();
routes.get("/", allOrders);
routes.post("/", createOrder);

module.exports = routes;
