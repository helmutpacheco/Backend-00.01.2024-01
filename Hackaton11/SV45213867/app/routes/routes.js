
module.exports = app => {
    const mascota = require("../controllers/mascota.controller.js");
    const especie = require("../controllers/especie.controller.js");
    const raza = require("../controllers/raza.controller.js");
    const propietario = require("../controllers/propietario.controller.js");
    const color = require("../controllers/color.controller.js");
    const nacionalidad = require("../controllers/nacionalidad.controller.js");
    const vacuna = require("../controllers/vacuna.controller.js");
    const sexo = require("../controllers/sexo.controller.js");
    var router = require("express").Router();

    router.get("/mascota", mascota.findAll);
    router.get("/mascota/:id", mascota.findOne);
    router.delete("/mascota/:id", mascota.deleteOne);
    router.put("/mascota/:id", mascota.update);

    

    router.post("/propietario", propietario.create);
    router.get("/propietario/:id", propietario.findOne);
    router.get("/propietario", propietario.findAll);
    router.put("/propietario/:id", propietario.update);
    router.post("/propietario/mascota", propietario.createMascota);

    

    router.post("/color", color.create);
    router.get("/color", color.findAll);


    router.post("/nacionalidad", nacionalidad.create);
    router.get("/nacionalidad", nacionalidad.findAll);


    router.post("/vacuna", vacuna.create);
    router.get("/vacuna", vacuna.findAll);


    router.post("/especie", especie.create);
    router.get("/especie", especie.findAll);


    router.post("/raza", raza.create);
    router.get("/raza", raza.findAll);


    router.post("/sexo", sexo.create);
    router.get("/sexo", sexo.findAll);



    app.use('/', router);
}