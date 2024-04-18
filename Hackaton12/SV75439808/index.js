const http = require("http");
const url = require("url");
 
let listSales = [];
 
const server = http.createServer((req, res) => {
  //   res.writeHead(200, { "Content-Type": "application/json" });
 
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
 
  if (req.method == "POST" && path === "/sales") {
    console.log("estas creando");
    let body = "";
    // console.log(req.on);
    req.on("data", (chuck) => {
      //   console.log(chuck);
      body += chuck.toString();
    });
 
    return req.on("end", () => {
      const { name, description, date } = JSON.parse(body);
 
      if (!name || !description || !date) {
        // console.log(name, description, date);
 
        // return res.end(JSON.stringify({ message: "hola" }));
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Faltan campos" }));
      } else {
        console.log(name, description, date);
 
        listSales.push({ name, description, date });
 
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(listSales));
      }
    });
  }
 
  res.writeHead(404, { "Content-Type": "application/json" });
 
  res.end("recurso no encontrado");
});
 
server.listen(3000);