//const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

//conexion a la base de datos mysql
const sequelize = new Sequelize('Prueba', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql', 
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.propietario = require("./propietario.model.js")(sequelize, Sequelize);
db.mascota = require("./mascota.model.js")(sequelize, Sequelize);

db.color = require("./color.model.js")(sequelize, Sequelize);
db.especie = require("./especie.model.js")(sequelize, Sequelize);
db.raza = require("./raza.model.js")(sequelize, Sequelize);
db.sexo = require("./sexo.model.js")(sequelize, Sequelize);
db.vacuna = require("./vacuna.model.js")(sequelize, Sequelize);
db.nacionalidad = require("./nacionalidad.model.js")(sequelize, Sequelize);

db.propietario.hasMany(db.mascota, { as: "mascotas"});
db.mascota.belongsTo(db.propietario, {
  foreignKey: "propietarioId",
  as: "propietario",
});


db.nacionalidad.hasOne(db.propietario, { as : "propietario"});
db.propietario.belongsTo(db.nacionalidad, {
    foreignKey : "nacionalidadID",
    as : "nacionalidad"
});


db.especie.hasOne(db.mascota, {as : "mascota"});
db.mascota.belongsTo(db.especie, {
    foreignKey : "especieID",
    as : "especie"
});


db.raza.hasOne(db.mascota, {as : "mascota"});
db.mascota.belongsTo(db.raza, {
    foreignKey : "razaID",
    as : "raza"
});


db.sexo.hasOne(db.mascota, {as : "mascota"});
db.mascota.belongsTo(db.sexo, {
    foreignKey : "sexoID",
    as : "sexo"
});



db.color.hasOne(db.mascota, {as : "mascota"});
db.mascota.belongsTo(db.color, {
    foreignKey : "colorID",
    as : "color"
});



db.mascota.belongsToMany(db.vacuna, {
    through: 'mascota_vacuna', 
    foreignKey: 'mascotaId', 
    as: 'vacunas' 
  });
db.vacuna.belongsToMany(db.mascota, {
    through: 'mascota_vacuna', 
    foreignKey: 'vacunaId', 
    as: 'mascotas' 
  });

module.exports = db;