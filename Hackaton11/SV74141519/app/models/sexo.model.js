module.exports = (sequelize, DataType) => {
    const Sexo = sequelize.define("sexo", {
      descripcion: {
        type: DataType.STRING
      }
    });
  
    return Sexo;
  };