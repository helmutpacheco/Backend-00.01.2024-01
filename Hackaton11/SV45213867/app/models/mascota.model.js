module.exports = (sequelize, DataType) => {
    const Mascota = sequelize.define("mascota", {
      nombre: {
        type: DataType.STRING
      },
      fechaNacimiento: {
        type: DataType.DATE
      }
    });
  
    return Mascota;
  };
  