const { Router } = require("express");
const { findAllUsers, createUser, findOneUser, deleteUser, updateUser } = require("./services");

const routes = Router();

routes.get("/",findAllUsers);
routes.post("/",createUser);
routes.get("/:id",findOneUser);
routes.delete("/:id",deleteUser);
routes.put("/:id",updateUser);

module.exports = routes;