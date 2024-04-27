const db = require("../models");
const Especie = db.especie;
const Mascota = db.mascota;

exports.create = (req, res) =>{

    const especie = {
        "descripcion" : req.body.descripcion
    }

    Especie.create(especie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Especie."
            });
        });

}



exports.findAll = (req, res) => {

    Especie.findAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Especie."
        });
    })
}

