const http = require ("node:http");
const path = require ("node:path");
const mongoose = require("mongoose")
const routesMessages = require("../modules/routes");


const express = require ("express");
const { Server:SocketServer } = require ("socket.io");

class Server { 
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 4002;
        this.server = http.createServer(this.app);
        this.io = new SocketServer(this.server,{
            cors:{
                origin:`https://localhost:4002`,
            },
        });
        this.mongoUri = `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`;
        this.originPath  = "/api"

        //middleware
        this.middleware();

        //database
        this.connectionDb();

        //socket
        this.socket();

        //routes
        this.routes();
    }

    middleware(){
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname,"../public")));
    }

    async connectionDb(){
        await mongoose.connect(this.mongoUri).then(() => {
            console.log("DATABASE");
        })

    };

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

    listen(){
        this.server.listen(this.port,() => {
            console.log("Server connected on " + this.port)
        })
    }

    routes() {
        this.app.use(this.originPath, routesMessages);
      }
}

module.exports = Server;