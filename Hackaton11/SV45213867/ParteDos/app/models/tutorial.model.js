module.exports = (sequelize, DataType) => {
    const Tutorial = sequelize.define("tutorial", {
      title: {
        type: DataType.STRING
      },
      description: {
        type: DataType.STRING
      },
      published: {
        type: DataType.BOOLEAN
      }
    });
  
    return Tutorial;
  };
  