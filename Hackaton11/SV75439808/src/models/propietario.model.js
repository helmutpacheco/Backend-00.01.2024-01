module.exports = (sequelize, DataTypes) => {
  const Propietario = sequelize.define("propietarios", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    idNacionalidad: {
      type: DataTypes.INTEGER,
    },
    ubigeo: {
      type: DataTypes.STRING,
    },
    activo: {
      type: DataTypes.TINYINT,
    },
    usuarioCreacion: {
      type: DataTypes.INTEGER,
    },
    fechaCreacion: {
      type: DataTypes.DATETIME,
    },
    usuarioModificacion: {
      type: DataTypes.INTEGER,
    },
    fechaModificacion: {
      type: DataTypes.DATETIME,
    },
  });
  return Propietario;
};
