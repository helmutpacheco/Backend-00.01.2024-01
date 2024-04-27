const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
const https = require('https');


app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        // if(msg == "clima"){
        //     const req = https.request(options, function (res) {
        //         const chunks = [];
            
        //         res.on('data', function (chunk) {
        //             chunks.push(chunk);
        //         });
            
        //         res.on('end', function () {
        //             const body = Buffer.concat(chunks);
        //             let jsonData = JSON.parse(body.toString()).results;
        //             console.log(jsonData);
        //             // Mostrar solo los títulos de las películas y la fecha de estreno
        //             arrRespuesta = [];
        //             for (let i=0;i<jsonData.length;i++){
        //              //   console.log(jsonData[i].primaryImage["url"]);
        //              objImagen = jsonData[i].primaryImage;
        //                 let info = {
        //                     titulo: jsonData[i].titleText.text,
        //                     estreno: new Date(  jsonData[i].releaseDate.year, jsonData[i].releaseDate.month,jsonData[i].releaseDate.day),
        //                     portada: objImagen
        //                 }
        //                 arrRespuesta.push(info);
                        
        //             }
        //             console.log(arrRespuesta);
        //             io.emit("chat message",JSON.stringify( arrRespuesta));
        //         });
        //     });
        //     req.end();
        // }
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});