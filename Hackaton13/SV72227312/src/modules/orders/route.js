const { Router } = require("express");
const { findAllOrder, createOrder, findOneOrder, deleteOrder, updateOrder } = require("./services");

const routes = Router();

routes.get("/",findAllOrder);
routes.post("/",createOrder);
routes.get("/:id",findOneOrder);
routes.delete("/:id",deleteOrder);
routes.put("/:id",updateOrder);

module.exports = routes;