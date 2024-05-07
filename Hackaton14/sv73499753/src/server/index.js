const http = require("node:http");
const path = require("node:path");
const Message = require("../modules/messages/model"); // Importa el modelo de mensaje
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
    this.routes();
  }
  routes() {
     // Ruta para obtener mensajes relevantes para un usuario específico
     this.app.get("/messages/:username/:to", async (req, res) => {
      const username = req.params.username;
      const to = req.params.to;
      console.log("Solicitud de historial de mensajes para el usuario:", username);
      try {
        const messages = await Message.find({
          $or: [
            { $and: [{ from: username }, { to: to }] }, // Mensajes enviados por 'username' a 'tos'
            { $and: [{ from: to }, { to: username }] } // Mensajes enviados por 'tos' a 'username'
        ]
    });
        console.log("Mensajes encontrados:", messages);
        res.json(messages);
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
        res.status(500).json({ error: "Error al obtener mensajes" });
      }
    });

    this.app.put("/messages/:id", async (req, res) => {
      const messageId = req.params.id;
      const { username, newMessage } = req.body;
      console.log("Solicitud de edición de mensaje con ID:", messageId, "por el usuario:", username);
      try {
          // Buscar el mensaje por su ID
          const message = await Message.findById(messageId);
          if (!message) {
              return res.status(404).json({ error: "Mensaje no encontrado" });
          }
          // Verificar si el usuario que intenta editar el mensaje es el remitente
          if (message.from !== username) {
              return res.status(403).json({ error: "No tienes permiso para editar este mensaje" });
          }
          // Actualizar el mensaje con el nuevo contenido
          message.message = newMessage;
          await message.save();
          console.log("Mensaje editado exitosamente:", message);
          res.status(200).json({ message: "Mensaje editado exitosamente", editedMessage: message });
      } catch (error) {
          console.error("Error al editar el mensaje:", error);
          res.status(500).json({ error: "Error al editar el mensaje" });
      }
  });
  }

  middleware() {
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(express.json());
  }

  async connectionDb() {
    try {
      await mongoose.connect(this.mongoUri);
      console.log("Conexión exitosa a la base de datos");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }
  }

  socket() {
    this.io.on("connection", (socket) => {
      console.log("Usuario conectado");

      socket.on("chat message", async (msg) => {
        console.log(msg);
        
        try {
          // Guardar el mensaje en la base de datos utilizando el modelo de mensaje
          const newMessage = new Message({
            from: msg.from,
            to: msg.to,
            message: msg.message,
            timestamp: new Date()
          });
          await newMessage.save();
          console.log("Mensaje guardado en la base de datos:", newMessage);
        } catch (error) {
          console.error("Error al guardar el mensaje en la base de datos:", error);
        }

        // Emitir el mensaje a todos los clientes
        this.io.emit("chat message", msg);
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }
}


module.exports = Server;
