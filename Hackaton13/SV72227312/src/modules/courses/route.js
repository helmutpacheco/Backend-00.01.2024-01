const { Router } = require("express");
const { createCourse, findOneCourse, findAllCourse, deleteCourse, updateCourse } = require("./services");

const routes = Router();

routes.get("/",findAllCourse);
routes.post("/",createCourse);
routes.get("/:id",findOneCourse);
routes.delete("/:id",deleteCourse);
routes.put("/:id",updateCourse);

module.exports = routes;