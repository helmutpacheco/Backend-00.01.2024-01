const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
};