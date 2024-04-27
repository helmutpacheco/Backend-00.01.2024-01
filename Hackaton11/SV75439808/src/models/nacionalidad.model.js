module.exports = (sequelize, DataTypes) => {
  const Nacionalidad = sequelize.define("nacionalidades", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    activo: {
      type: DataTypes.TINYINT,
    },
    usuarioCreacion: {
      type: DataTypes.INTEGER,
    },
    fechaCreacion: {
      type: DataTypes.INTEGER,
    },
    usuarioModificacion: {
      type: DataTypes.INTEGER,
    },
    fechaModificacion: {
      type: DataTypes.INTEGER,
    },
  });
  return Nacionalidad;
};
