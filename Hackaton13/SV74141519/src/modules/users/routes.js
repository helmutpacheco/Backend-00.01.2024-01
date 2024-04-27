const { Router } = require("express");
const { createUser } = require("./services");

const routes = Router();

routes.post("/", createUser);

module.exports = routes;
