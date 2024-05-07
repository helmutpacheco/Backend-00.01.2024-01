const express = require("express");
//const {sequelize} = require ("sequelize")
const routesUsers = require("../Modules/users/routes");
const sequelize = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.originPath = "/api";
    this.userPath = `${this.originPath}/users`;
    this.middleare();
    this.routes();
    this.db();
  }

  middleare() {
    this.app.use(express.json());
  }

  async db() {
    try {
      await sequelize.authenticate();
      console.log("La conexión a la base de datos ha sido exitosa");
      
    } catch (error) {
      console.error("No se pudo establecer una conexión a la base de datos: ", + error);
    }
  }

  routes() {
    this.app.use(this.userPath, routesUsers);
    
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port" + this.port);
    });
  }
};

module.exports =  Server;
