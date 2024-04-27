module.exports = (sequelize, DataType) => {
    const Propietario = sequelize.define("propietario", {
      nombre: {
        type: DataType.STRING
      },
      apellido: {
        type : DataType.STRING
      },
      direccion: {
        type : DataType.STRING
      },
      telefono: {
        type : DataType.TINYINT
      }
    });
  
    return Propietario;
  };