module.exports = (sequelize, DataTypes) => {
  const Ubigeo = sequelize.define("ubigeos", {
    ubigeo: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ubicacion: {
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
  return Ubigeo;
};
