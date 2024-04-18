const http = require("http");
const url = require("url");
 
let listSales = [];
 
const server = http.createServer((req, res) => {
  //   res.writeHead(200, { "Content-Type": "application/json" });
 
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
 
  if (req.method == "POST" && path === "/sales") {
    console.log("Creando...");
    let body = "";
    // console.log(req.on);
    req.on("data", (chuck) => {
      //   console.log(chuck);
      body += chuck.toString();
    });
 
    return req.on("end", () => {
      const { name, description, date, esCompletado } = JSON.parse(body);
 
      if (!name || !description || !date || !esCompletado) {
        // console.log(name, description, date);
 
        // return res.end(JSON.stringify({ message: "hola" }));
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Faltan campos" }));
      } else {
        console.log(name, description, date, esCompletado);
 
        listSales.push({ name, description, date, esCompletado});
 
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(listSales));
      }
    });
  }

  else if (req.method === "GET" && path === "/sales/pendiente") {
    // Manejar la solicitud GET para obtener ventas pendientes
    const pendientes = listSales.filter(sale => sale.esCompletado === 'pendiente');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(pendientes));
  }

  else if (req.method === "GET" && path === "/sales/completado") {
    // Manejar la solicitud GET para obtener ventas completadas
    const completados = listSales.filter(sale => sale.esCompletado === 'completado');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(completados));
  }

  else {
    res.writeHead(404, { "Content-Type": "application/json" });
 
    res.end("recurso no encontrado");
  }
});
 
server.listen(3000);