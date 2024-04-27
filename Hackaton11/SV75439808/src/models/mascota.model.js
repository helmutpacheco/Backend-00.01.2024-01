module.exports = (sequelize, DataTypes) => {
  const Mascota = sequelize.define("mascotas", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
    },
    idEspecie: {
      type: DataTypes.INTEGER,
    },
    idRaza: {
      type: DataTypes.INTEGER,
    },
    idSexo: {
      type: DataTypes.INTEGER,
    },
    idPropietario: {
      type: DataTypes.INTEGER,
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
  return Mascota;
};
