const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    let query = req.query;
    console.log(query);
    res.send('Hello World!')
})

app.get('/sales', (req, res) => {
    res.send('Sales World!');
    console.log('res', res.req.socket);
 });
  
app.get('/user/:id', (req, res) => {
    let params = req.params;
    let data = req.body;
    // console.log(req);
    console.log(params);
    console.log('aqui');
    res.send(`Hello World! ${params.id}`);
    // res.status(301).location('https://google.com');
    // res.status(200).sendFile('/dota.jpg');
    res.end();
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})