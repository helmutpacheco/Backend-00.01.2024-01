var http = require('http');
var fs = require('fs');
var url = require('url');

// Lista de compras
var listaCompras = [];

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    console.log(req.url);

    switch (q.pathname) {
        case '/':
            fs.readFile("index.html", function(err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                } 
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
            break;
        case '/crear':
            if (req.method === 'POST') {
                var body = '';
                req.on('data', function(data) {
                    body += data;
                });
                req.on('end', function() {
                    var newItem = JSON.parse(body);
                    listaCompras.push(newItem);
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('Elemento agregado a la lista de compras');
                });
            } else {
                res.writeHead(405, {'Content-Type': 'text/plain'});
                res.end('Método no permitido');
            }
            break;
        case '/pendientes':
            var pendientes = listaCompras.filter(function(item) {
                return !item.esCompletado;
            });
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(pendientes));
            break;
        case '/completados':
            var completados = listaCompras.filter(function(item) {
                return item.esCompletado;
            });
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(completados));
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('Ruta no encontrada');
            break;
    }

}).listen(8080);
