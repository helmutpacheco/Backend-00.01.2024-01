const http = require('http');
const listaCompras = [
    { id: 1, nombre: 'Leche', descripcion: 'Comprar leche descremada en el supermercado', fecha: '2024-04-12', esCompletado: false },
    { id: 2, nombre: 'Pagar factura', descripcion: 'Pagar la factura de electricidad antes del vencimiento', fecha: '2024-04-15', esCompletado: true },
    { id: 3, nombre: 'Hacer ejercicio', descripcion: 'Ir al gimnasio y hacer ejercicio durante una hora', fecha: '2024-04-13', esCompletado: false },
    { id: 4, nombre: 'universidad', descripcion: 'pagar la universidad', fecha: '2024-04-12', esCompletado: false },
    { id: 5, nombre: 'ir a clases de baile', descripcion: 'pagar las clases antes de', fecha: '2024-04-15', esCompletado: true },
    { id: 6, nombre: 'ir a la peluqueria', descripcion: 'pagar la peluqueria', fecha: '2024-04-13', esCompletado: false }
];

const server = http.createServer((req, res) => {
    if (req.url === '/compras' && req.method === 'GET') {
        const pendientes = listaCompras.filter(item => !item.esCompletado);
        const completados = listaCompras.filter(item => item.esCompletado);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ pendientes, completados }));
    } else if (req.url === '/compras/pendientes' && req.method === 'GET') {
        const pendientes = listaCompras.filter(item => !item.esCompletado);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(pendientes));
    } else if (req.url === '/compras/completados' && req.method === 'GET') {
        const completados = listaCompras.filter(item => item.esCompletado);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(completados));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

server.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});