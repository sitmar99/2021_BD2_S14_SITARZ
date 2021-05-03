// to są takie #include<..>
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

// stałe definiujące parametry połączenia
const hostname = '127.0.0.1'
const port = 8080

// zmienne serwera i połączenia z mysql
const app = express()
app.use(bodyParser.json()) // body będą przekazywane jako JSON
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bd2_s14"
})

// połączenie z serwerem mysql
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql server...')
})

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello node')
})

app.post('/login', (req, res) => {
    con.query(`SELECT * FROM users WHERE username = '${req.body.login}';`, (err, result) => {
        if (err) throw err;

        if (result.length > 0 && result[0].password === req.body.password) {
            res.sendStatus(200);
        } else {
            res.statusCode = 401;
            res.send('User doesn\'t exists or wrong password')
        }
    })
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
