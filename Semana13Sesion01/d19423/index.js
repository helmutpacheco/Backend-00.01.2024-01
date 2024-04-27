const express = require('express');
const bodyparser = require("body-parser");
const app = express()
const port = 3000
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    let query = req.query;
    console.log(query);
    res.sendFile(__dirname +'/index.html')
    //res.send(`Hello World! ${query.nombre}`)
  })

app.get('/:id', (req, res) => {
    let params = req.params;
    console.log(params);
    res.send(`Hello World! ${params.id}`)
  })

app.post('/user/:id', (req, res) => {
    let params = req.params;
    let data = req.body
    console.log(req);
    
    //res.send(`Hello World! ${data.nombre}`)
    //res.status(301).location('http://www.x-codec.net')
    
    res.end()
  })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })