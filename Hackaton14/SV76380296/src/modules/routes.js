const { Router } = require('express');
const { createMessage, deleteOneMessage } = require("./services");

const routes = Router();

routes.post('/',createMessage)
routes.delete("/", deleteOneMessage);

module.exports = routes;