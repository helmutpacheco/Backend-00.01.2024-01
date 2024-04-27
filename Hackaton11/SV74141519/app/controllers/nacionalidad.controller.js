const db = require("../models");
const Nacionalidad = db.nacionalidad;


exports.create = (req, res) => {

    const nacionalidad = {
        "descripcion" : req.body.descripcion
    }

    Nacionalidad.create(nacionalidad).
    then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Nacionalidad."
        });
    });

}

exports.findAll = (req, res) =>{

    Nacionalidad.findAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "NO HAY NACIONALIDADES."
        });
    });

}