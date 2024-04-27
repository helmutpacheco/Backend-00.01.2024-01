module.exports = (sequelize, DataTypes) => {
  const Especie = sequelize.define("especies", {
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
      type: DataTypes.DATETIME,
    },
    usuarioModificacion: {
      type: DataTypes.INTEGER,
    },
    fechaModificacion: {
      type: DataTypes.DATETIME,
    },
  });
  return Especie;
};
