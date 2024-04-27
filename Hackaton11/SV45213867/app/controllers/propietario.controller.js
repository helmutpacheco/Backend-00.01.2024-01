const db = require("../models");
const Propietario = db.propietario;
const Mascota = db.mascota;


exports.create = (req, res) => {
    
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const propietario = {
        "nombre" : req.body.nombre,
        "apellido" : req.body.apellido,
        "direccion" : req.body.direccion,
        "telefono" : req.body.telefono,
        "nacionalidadID" : req.body.nacionalidad
    }

    Propietario.create(propietario)
    .then(data => {
        res.send(data);
    }).catch(
        err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        }
    )

}

exports.findAll = (req, res) => {

    Propietario.findAll({include : ["mascotas"]})
    .then(data =>{
        res.send(data);
    })
    .catch(
        err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        }
    )

}

exports.findOne = (req, res) =>{

    const idPropietario = req.params.id;

    Propietario.findByPk(idPropietario, {include : ["mascotas", "nacionalidad"]})
    .then(data =>{
        res.send(data);
    })
    .catch(
        err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        }
    )
}

exports.createMascota = (req, res) => {
    

    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const idPropietario = req.body.propietario;
    const idEspecie = req.body.especie;
    const idRaza = req.body.raza;
    const idSexo = req.body.sexo;
    const idColor = req.body.color;

    Mascota.create({
        "nombre": req.body.nombre,
        "fechaNacimiento": Date(),
        "propietarioId": idPropietario,
        "especieID" : idEspecie,
        "razaID" : idRaza,
        "sexoID" : idSexo,
        "colorID" : idColor

    })
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
    
exports.update = (req, res) =>{

    const id = req.params.id;
    const campoActualizar = req.body.campo;
    const dataActualizada = req.body.data;

    Propietario.update(
        { [campoActualizar]: dataActualizada }, // Actualiza solo el campo especificado
        { where: { id: id } }
    )
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Propietario was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Propietario with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Propietario with id=" + id
            });
        });

}