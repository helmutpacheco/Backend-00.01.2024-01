module.exports = (sequelize, DataType) => {
    const Especie = sequelize.define("especie", {
      descripcion: {
        type: DataType.STRING
      }
    });
  
    return Especie;
  };
  