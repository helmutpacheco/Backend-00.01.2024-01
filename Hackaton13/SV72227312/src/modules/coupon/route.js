const { Router } = require("express");
const { findAllCoupon, createCoupon, findOneCoupon, deleteCoupon, updateCoupon } = require("./services");

const routes = Router();

routes.get("/",findAllCoupon);
routes.post("/",createCoupon);
routes.get("/:id",findOneCoupon);
routes.delete("/:id",deleteCoupon);
routes.put("/:id",updateCoupon);

module.exports = routes;