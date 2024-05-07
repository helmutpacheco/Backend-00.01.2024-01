const UserModel = require('../models/users.model');
const crypto = require('crypto');

const CourseModel = require('../../courses/models/courses.model');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send("SE ACTUALIZO EL USUARIO");
        });

};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send("SE ELIMINO EL USUARIO");
        });
};

exports.addCourse = (req, res) => {

    const curso = req.body.curso;
    const userId = req.body.userId;

    CourseModel.findByName(curso)
        .then(cursoEncontrado => {
            if (!cursoEncontrado) {
                console.log("El curso no fue encontrado.");
                return;
            }

            const cursoData = {
                _id: cursoEncontrado[0]._id,
                nombre: cursoEncontrado[0].nombre,
                valor: cursoEncontrado[0].valor,
            };

            const userData = {
                $addToSet: { cursos: cursoData } 
            };

            const opcion = {"_id" : userId};

            return UserModel.patchUser(opcion, userData);

        })  
        .then(resultado => {
            if (!resultado) {
                console.log("El documento del usuario no fue modificado.");
                return;
            }

            console.log("Curso agregado al usuario exitosamente.");
        })
        .catch(err => {
            console.error("Error:", err);
        });
        res.send("SE AGREGO EL CURSO");
};

exports.payCourse = (req, res) => {
    const userId = req.body.userId;
    const curso = req.body.curso;

    UserModel.findById(userId)
    .then(user => {
        console.log(user);
        const userData = {
            $set: { "cursos.$.pagado": true }
        };

        const opcion = {
            "_id" : userId,
            "cursos.nombre" : curso
        };

        return UserModel.patchUser(opcion, userData);
    })
    .catch(err =>{
        console.log(err);
    })
  

    res.send("SE REALIZO EL PAGO");
};


exports.deleteCourse = (req , res) => {
    const userId = req.params.userId;
    const curso = req.body.curso;
    console.log(userId);
    UserModel.findById(userId)
    .then(user =>{
        console.log(user);
        const userData = {
            $pull: { cursos: { nombre: curso } } 
        };

        const opcion = {
            "_id" : userId
        };

        return UserModel.patchUser(opcion, userData);
    })
    .catch(err =>{
        console.log(err);
    })

    res.send("SE ELIMINO CURSO");
};