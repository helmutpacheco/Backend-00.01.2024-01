module.exports = (sequelize, DataType) => {
    const Raza = sequelize.define("raza", {
      descripcion: {
        type: DataType.STRING
      }
    });
  
    return Raza;
  };