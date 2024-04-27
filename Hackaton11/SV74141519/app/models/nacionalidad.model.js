module.exports = (sequelize, DataType) => {
    const Nacionalidad = sequelize.define("nacionalidades", {
      descripcion: {
        type: DataType.STRING
      }
    });
  
    return Nacionalidad;
  };