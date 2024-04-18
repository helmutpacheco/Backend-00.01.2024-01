var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    switch (req.url) {
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
        case '/menu':
            fs.readFile("menu.html", function(err, data) {
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
            if (req.method === 'GET') {
                fs.readFile("crear.html", function(err, data) {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        return res.end("404 Not Found");
                    } 
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    return res.end();
                });
            } else if (req.method === 'POST') {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    // Parsear los datos del formulario
                    const formData = new URLSearchParams(body);
                    const nombre = formData.get('nombre');
                    const descripcion = formData.get('descripcion');
                    const fecha = formData.get("fecha");
                    const entregado = formData.get("entrega");

                    var entrega = entregado == "on" ? "si" : "no";
                    
                    var data = nombre + "|" + descripcion + "|" + fecha + "|" + entrega + "\n";

                    fs.appendFile("lista", data, function(err){
                        if (err) throw err;
                        console.log("GUARDADO");
                    })

                    res.writeHead(302, { 'Location': '/crear' });
                    return res.end();
                });
            }
            break;
        case '/completado':
                fs.readFile("lista", "utf-8", function(err, data){
                    if (err) throw err;
                    var html = "<table><thead><tr><th>Nombre</th><th>Descripcion</th><th>Fecha</th><th>Entregado</th></tr></thead><tbody>";
                    var addHtml = "";
                    var info = data.split("\n");
                    info.forEach(linea => {
                        const line = linea.trim().split("|");
                        if(line[3] == 'si'){
                            addHtml += "<tr>";
                            addHtml += "<td>" + line[0] + "</td>";
                            addHtml += "<td>" + line[1] + "</td>";
                            addHtml += "<td>" + line[2] + "</td>";
                            addHtml += "<td>" + line[3] + "</td>";
                        };
                        addHtml += "</tr>";

                    });
                    html += addHtml;
                    html += "</tbody></table>";
                    html += '<div><a href="/menu" class="boton">Ir al menu</a></div>';
                    res.write(html);
                    return res.end();
                });

            break;
        case '/pendiente':
                fs.readFile("lista", "utf-8", function(err, data){
                    if (err) throw err;
                    var html = "<table><thead><tr><th>Nombre</th><th>Descripcion</th><th>Fecha</th><th>Entregado</th></tr></thead><tbody>";
                    var addHtml = "";
                    var info = data.split("\n");
                    info.forEach(linea => {
                        const line = linea.trim().split("|");
                        if(line[3] == 'no'){
                            addHtml += "<tr>";
                            addHtml += "<td>" + line[0] + "</td>";
                            addHtml += "<td>" + line[1] + "</td>";
                            addHtml += "<td>" + line[2] + "</td>";
                            addHtml += "<td>" + line[3] + "</td>";
                        };
                        addHtml += "</tr>";

                    });
                    html += addHtml;
                    html += "</tbody></table>";
                    html += '<div><a href="/menu" class="boton">Ir al menu</a></div>';
                    res.write(html);
                    return res.end();
                });
                break;
        default:
            res.write("RUTA NO ENCONTRADA");
            res.end();
            break;
    }

}).listen(8080);