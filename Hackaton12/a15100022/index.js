const http = require("http");
const url = require("url");
const fs = require('fs');

let ListSale = [];
let listaId = 1;

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    // Ruta para crear una nueva lista de compras
    if (reqUrl.pathname === '/crear-lista' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const nuevaLista = JSON.parse(body);
            // Agregar la lista al array
            ListSale.push({
                Id: listaId++, // Incrementamos el contador y luego lo asignamos al ID
                Nombre: nuevaLista.Nombre,
                Descripcion: nuevaLista.Descripcion,
                Fecha: nuevaLista.Fecha,
                EsCompletado: nuevaLista.EsCompletado
            });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Lista creada con éxito' }));
        });
    }

    // Ruta para mostrar los pendientes
    else if (reqUrl.pathname === '/pendientes' && req.method === 'GET') {
        const pendientes = ListSale.filter(lista => !lista.EsCompletado);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(pendientes));
    }

    // Ruta para mostrar los completados
    else if (reqUrl.pathname === '/completados' && req.method === 'GET') {
        const completados = ListSale.filter(lista => lista.EsCompletado);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(completados));
    }

    // Ruta para manejar recursos estáticos (por ejemplo, una página HTML)
    else if (reqUrl.pathname === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Error: Página no encontrada');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }

    // Ruta no encontrada
    else {
        res.writeHead(404);
        res.end('Error: Ruta no encontrada');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});