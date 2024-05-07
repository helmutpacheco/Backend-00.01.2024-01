const { Router } = require("express");

const userServices = require ("../service/index");
const routes = Router();

routes.get('/', userServices.findAll);// Devuelve todos los usuarios
routes.post('/', userServices.createUser)
module.exports = routes;