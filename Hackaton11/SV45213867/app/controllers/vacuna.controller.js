const db = require("../models");
const Vacuna = db.vacuna;

exports.create = (req, res) => {

    const vacuna = {
        "descripcion" : req.body.descripcion
    }

    Vacuna.create(vacuna)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating Vacuna"
        });
    });

}


exports.findAll = (req, res) => {

    Vacuna.findAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "NO HAY VACUNAS"
        });
    });

}