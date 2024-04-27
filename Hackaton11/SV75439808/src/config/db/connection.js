const Sequelize = require("sequelize");

const sequelize = new Sequelize("veterinaria", "root", "Im4nel$.75439808", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

const cn = {};
cn.Sequelize = Sequelize;
cn.sequelize = sequelize;

cn.especie = require("../../models/especie.model.js")(sequelize, Sequelize);
cn.mascota = require("../../models/mascota.model.js")(sequelize, Sequelize);
cn.nacionalidad = require("../../models/nacionalidad.model.js")(sequelize, Sequelize);
cn.propietario = require("../../models/propietario.model.js")(sequelize, Sequelize);
cn.raza = require("../../models/raza.model.js")(sequelize, Sequelize);
cn.sexo = require("../../models/sexo.model.js")(sequelize, Sequelize);
cn.ubigeo = require("../../models/ubigeo.model.js")(sequelize, Sequelize);
cn.usuario = require("../../models/usuario.model.js")(sequelize, Sequelize);
cn.vacunas = require("../../models/vacuna.model.js")(sequelize, Sequelize);

cn.propietario.hasMany(cn.mascota, { as: "mascotas"});
cn.mascota.belongsTo(cn.propietario, {
  foreignKey: "idPropietario",
  as: "propietario",
});

cn.sexo.hasMany(cn.mascota, { as: "mascotas"});
cn.mascota.belongsTo(cn.sexo, {
  foreignKey: "idSexo",
  as: "sexo",
});

cn.propietario.hasMany(cn.mascota, { as: "mascotas"});
cn.mascota.belongsTo(cn.propietario, {
  foreignKey: "propietarioId",
  as: "propietario",
});

cn.propietario.hasMany(cn.mascota, { as: "mascotas"});
cn.mascota.belongsTo(cn.propietario, {
  foreignKey: "propietarioId",
  as: "propietario",
});

module.exports = cn;
