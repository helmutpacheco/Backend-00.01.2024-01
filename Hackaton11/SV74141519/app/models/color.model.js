module.exports = (sequelize, DataType) => {
    const Color = sequelize.define("color", {
      descripcion: {
        type: DataType.STRING
      }
    });
  
    return Color;
  };