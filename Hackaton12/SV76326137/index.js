const http = require('http');
const url = require('url');

let compras = [];

function crearLista(req, res) {
    let nuevaCompra = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        esCompletado: false
    };

    compras.push(nuevaCompra);
    res.end('Lista de compras creada exitosamente');
}

function mostrarPendientes(req, res) {
    let pendientes = compras.filter(compra => !compra.esCompletado);
    res.end(JSON.stringify(pendientes));
}

function mostrarCompletados(req, res) {
    let completados = compras.filter(compra => compra.esCompletado);
    res.end(JSON.stringify(completados));
}

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === '/crear-lista' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            crearLista(req, res);
        });
    } else if (reqUrl.pathname === '/pendientes') {
        mostrarPendientes(req, res);
    } else if (reqUrl.pathname === '/completados') {
        mostrarCompletados(req, res);
    } else {
        res.statusCode = 404;
        res.end('Ruta no encontrada');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
