const {Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../db/config")

const User = sequelize.define(
  "usuario",
  { id:{
      type:DataTypes.INTEGER,
      autoIncrement : true ,
      primaryKey:true
  },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    nombre: {
      type: DataTypes.STRING
    },
    apellido: {
      type: DataTypes.STRING
    },
    estadoCivil: {
      type: DataTypes.TINYINT
    },
    fechaNacimiento: {
      type: DataTypes.DATE
    },
    edad: {
      type: DataTypes.INTEGER
    },
    activo: {
      type: DataTypes.TINYINT
    },
    usuarioCreacion: {
      type: DataTypes.STRING
    },
    fechaCreacion: {
      type: DataTypes.DATE
    },
    fechaModificacion: {
      type: DataTypes.DATE
    },
  }, {
  tableName: "usuario",
  timestamps: false,
});

console.log(User === sequelize.models.User),

module.exports = User;