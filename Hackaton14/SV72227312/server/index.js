import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { Server as SocketServer } from 'socket.io';
import mysql from 'mysql2/promise';

dotenv.config();

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

// Configuración de la conexión a la base de datos MySQL
const db = await mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Creación de la tabla si no existe
await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    user VARCHAR(255)
  )
`);

io.on('connection', async (socket) => {
  console.log('a user has connected!');

  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });

  socket.on('chat message', async (msg) => {
    const username = socket.handshake.auth.username ?? 'anonymous';
    try {
      const [result] = await db.execute('INSERT INTO messages (content, user) VALUES (?, ?)', [msg, username]);
      io.emit('chat message', msg, result.insertId.toString(), username);
    } catch (e) {
      console.error(e);
      return;
    }
  });

  socket.on('clear history', async () => {
    try {
      await db.execute('DELETE FROM messages');
      io.emit('history cleared');
    } catch (e) {
      console.error('Error deleting messages:', e);
    }
  });

  if (!socket.recovered) {
    try {
      const [results] = await db.query('SELECT id, content, user FROM messages WHERE id > ?', [socket.handshake.auth.serverOffset ?? 0]);
      results.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.user);
      });
    } catch (e) {
      console.error(e);
    }
  }
});

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



