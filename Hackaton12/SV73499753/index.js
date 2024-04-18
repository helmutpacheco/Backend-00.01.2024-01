const http = require("http");
const url = require("url");
let listSales = [];
const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;

  //http://localhost:3000/sales --->ruta para agregar productos
    if (req.method === "POST" && path === "/sales") {
      
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
  
      return req.on("end", () => {
        const { name, description, date, estado } = JSON.parse(body);
        if (!name || !description || !date || !estado) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "Faltan campos" }));
        } else {
          console.log(name, description, date, estado);
          listSales.push({ name, description, date, estado });
          res.writeHead(201, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(listSales));
        }
      });
      //http://localhost:3000/sales --->ruta para listar todos  productos
    } else if (req.method === "GET" && path === "/sales") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(listSales));
        //http://localhost:3000/sales --->ruta para listar los   productos completos
    } else if (req.method === "GET" && path === "/sales/completed") {
      const completedSales = listSales.filter(sale => sale.estado === "completo");
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(completedSales));
        //http://localhost:3000/sales --->ruta para listar los   productos incompletos
    } else if (req.method === "GET" && path === "/sales/incompleted") {
      const incompletedSales = listSales.filter(sale => sale.estado !== "completo");
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(incompletedSales));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end("Recurso no encontrado");
    }
  });
  
  server.listen(3000);
