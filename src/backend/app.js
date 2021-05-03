// to są takie #include<..>
const express = require('express')
const con = require('./modules/database')
const bodyParser = require('body-parser')

// stałe definiujące parametry połączenia
const hostname = '127.0.0.1'
const port = 8080

// zmienne serwera
const app = express()
app.use(bodyParser.json()) // body będą przekazywane jako JSON

// zmienne routingów
var loginRoutes = require('./routes/login')
app.use('/login', loginRoutes)

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello node API!')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
