const db = require("../models");
const Sexo = db.sexo;

exports.create = (req, res) => {

    const sexo = {
        "descripcion" : req.body.descripcion
    }

    Sexo.create(sexo)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
}

exports.findAll = (req, res) =>{

    Sexo.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
    

}