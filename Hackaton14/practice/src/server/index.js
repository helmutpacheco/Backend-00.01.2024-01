const http = require("node:http");
const path = require("node:path");

const express = require("express");
const { Server: SocketServer } = require("socket.io");
const mongoose = require("mongoose");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4002;
    this.server = http.createServer(this.app);
    this.mongoUri = `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`;
    this.io = new SocketServer(this.server, {
      cors: {
        origin: "http://localhost:4002",
      },
    });

    //middleware
    this.middleware();

    //database
    this.connectionDb();

    //socket

    this.socket();
    //routes
  }

  middleware() {
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(express.json());
  }

  async connectionDb() {
    await mongoose.connect(this.mongoUri).then(() => {
      console.log("Connected! database");
    });
  }

  socket() {
    this.io.on("connection", (socket) => {
      console.log("usuario conectado");

      
      socket.on("chat message", (msg) => {
        console.log(msg);
        ///guarda en una base de datos

        this.io.emit("chat message", msg);
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`server escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
