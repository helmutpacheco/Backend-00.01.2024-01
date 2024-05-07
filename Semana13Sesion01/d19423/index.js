const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let query = req.query;
    console.log(query);
    res.sendStatus(201);//.sendFile(__dirname +'/uploads/gundam.png')
    //res.send(`Hello World! ${query.nombre}`)
  })

app.get('/:id', (req, res) => {
    let params = req.params;
    console.log(params);
    res.send(`Hello World! ${params.id}`);
});

app.post('/user/:id', (req, res) => {
    let data = req.body;
    console.log(data);
    
    // Envía una respuesta con el nombre recibido en el cuerpo de la solicitud
    //res.send(`Hello World! ${data.nombre}`);
    // Realiza la redirección a la URL proporcionada
    res.status(301) .location('http://www.x-codec.net');
    res.end()
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});