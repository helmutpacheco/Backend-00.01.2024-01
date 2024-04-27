module.exports = (sequelize, DataType) => {
    const Vacuna = sequelize.define("vacuna", {
      descripcion: {
        type: DataType.STRING
      }
    });
  
    return Vacuna;
  };