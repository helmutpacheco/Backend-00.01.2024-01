const http = require('http');
const { type } = require('os');
const url = require('url')

let listSales = [];
let listCompleted = [];
let listIncomplete = [];

const typeJsonResponse = {"Content-Type":"application/json"}

const server = http.createServer((req,res) => {
    //res.writeHead(200, {"Content-Type":"application/json"});
    
    const parseUrl = url.parse(req.url, true);
    //console.log(req.method)
    //console.log(parseUrl)

    const path = parseUrl.pathname;
    if(req.method == 'POST' && path === '/sales'){
        console.log("Estas creandosus.")
        let body = "";
        console.log(req.on);
        req.on('data', (chuck) =>{
            //console.log(chuck)
            body += chuck.toString();
        });

        return req.on("end",() =>{
            const {name, description, date, completed} = JSON.parse(body);
            
            if(!name||!description||!date||!completed){

                res.writeHead(400,{"Content-Type":"application/json"});
                return res.end(JSON.stringify({message:"Faltan Campos"}));
            
            } else {
                console.log(name, description, date, completed);
                listSales.push({name,description,date,completed})
                if(completed == true){
                    listCompleted.push({name,description,date,completed})
                } else {
                    listIncomplete.push({name,description,date,completed})
                }
            }
            //console.log(name,description,date);

            res.writeHead(200,{"Content-Type":"application/json"});
            return res.end(JSON.stringify(listSales));
        });

        console.log(body);
    
    } else if(req.method == 'GET' && path === '/incomplete'){
        console.log("Lista de ventas por completar");
        console.log(listIncomplete)
        res.writeHead(200,{"Content-Type":"application/json"});
        return res.end(JSON.stringify(listIncomplete));
    
    } else if(req.method == 'GET' && path === '/complete') {
        console.log("Lista de ventas completas");
        console.log(listIncomplete)
        res.writeHead(200,{"Content-Type":"application/json"});
        return res.end(JSON.stringify(listCompleted));
    }
    
    res.writeHead(404, {"Content-Type":"application/json"});
    res.end(JSON.stringify({message: "No se hallo el recurso."}))
});


server.listen(3000);

