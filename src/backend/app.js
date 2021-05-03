// to są takie #include<..>
const express = require('express')
const mysql = require('mysql')

// stałe definiujące parametry połączenia
const hostname = '127.0.0.1'
const port = 8080

// zmienne serwera i połączenia z mysql
const app = express()
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
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

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
