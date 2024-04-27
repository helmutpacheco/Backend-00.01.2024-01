const { MACADDR } = require("sequelize");
const db = require("../models");
const Op = db.Sequelize.Op;

const Mascota = db.mascota;
const Especie = db.especie;
const Color = db.color;
const Raza = db.raza;
const Sexo = db.sexo;
const Vacuna = db.vacuna;




exports.findOne = (req , res) =>{
    
    let id = req.params.id;

    Mascota.findByPk(id, {include : ["propietario","raza", "sexo", "especie", "color"]})
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "NO SE ENCONTRO MASCOTA."
        });
    })
    
};

exports.findAll = (req, res) =>{

    Mascota.findAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "NO HAY MASCOTAS."
        });
    })

}

exports.deleteOne = (req , res) =>{
    
    let id = req.params.id;

    Mascota.destroy({
        where: { id: id }
    })
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "NO HAY MASCOTA CON ESE ID."
        });
    })

}

exports.update = (req, res) => {

    const id = req.params.id;
    const campoActualizar = req.body.campo;
    const dataActualizada = req.body.data;

    Mascota.update(
        { [campoActualizar]: dataActualizada }, // Actualiza solo el campo especificado
        { where: { id: id } }
    )
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mascota was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Mascota with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Mascota with id=" + id
            });
        });

}




