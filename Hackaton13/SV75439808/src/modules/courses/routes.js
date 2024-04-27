const { Router } = require("express");
const { createCourse, findOneCourse, findAllCourse } = require("./services");

const routes = Router();
routes.get("/", findAllCourse);

routes.get("/:id", findOneCourse);
routes.post("/", createCourse);



module.exports = routes;
