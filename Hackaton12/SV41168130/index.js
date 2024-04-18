const http = require('http');
const url = require('url');

let listSales = [];

// Constantes para códigos de estado
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;

// Constantes para estado de venta
const STATUS_PENDING = 0;
const STATUS_COMPLETE = 1;

// Enrutador
const routes = {
    'POST' : {
        '/sales': handlePostSales
    },
    'GET' : {
        '/sales/complete' : handleCompleteSales,
        '/sales/pending' : handlePendingSales
    }
};

function isValidDate(dateString) {
    return !isNaN(Date.parse(dateString));
}

function handlePostSales(req, res) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const { name, description, date, status } = JSON.parse(body);
            
            if(!name || typeof name !== 'string' || !description || typeof description !== 'string' || !date || !isValidDate(date) || typeof status !== 'number') {

                res.writeHead(HTTP_STATUS_BAD_REQUEST, { 'Content-Type': 'application/json'});
                return res.end(JSON.stringify({ message: 'Datos inválidos' }));
        
            } else {

                console.log(name, description, date, status);            
                listSales.push({ name, description, date, status });
                res.writeHead(HTTP_STATUS_CREATED, { 'Content-type': 'application/json' });
                return res.end(JSON.stringify(listSales));
            }
        } catch (e) {
            res.writeHead(HTTP_STATUS_BAD_REQUEST, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({ message: 'Formato de JSON inválido' }));
        }
        
    });
}

function handleCompleteSales(req, res) {
    const completedSales = listSales.filter(sale => sale.status === STATUS_COMPLETE);
    res.writeHead(HTTP_STATUS_OK, { 'Content-type': 'application/json'});
    res.end(JSON.stringify(completedSales));
}

function handlePendingSales(req, res) {
    const pendingSales = listSales.filter(sale => sale.status === STATUS_PENDING);
    res.writeHead(HTTP_STATUS_OK, { 'Content-type': 'application/json'});
    res.end(JSON.stringify(pendingSales));
}

const server = http.createServer((req, res) => {

    const parseUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parseUrl.pathname;
    const method = req.method;

    // Configurar los encabezados para JSON
    res.setHeader('Content-Type', 'application/json');

    // Encontrar el manejador adecuado basado en el método y la ruta
    if (routes[method] && routes[method][path]) {
        routes[method][path](req, res);
    } else {
        res.statusCode = HTTP_STATUS_NOT_FOUND;
        res.end(JSON.stringify({ message: 'Recurso no encontrado' }));
    }
});

server.listen(3000, () => console.log('Server listening on port 3000'));