const db = require("../models");
const Raza = db.raza;

exports.create = (req, res) => {

    const raza = {
        "descripcion" : req.body.descripcion
    }

    Raza.create(raza)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Raza."
        });
    })

}

exports.findAll = (req, res) =>{

    Raza.findAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Raza."
        });
    })
    
}