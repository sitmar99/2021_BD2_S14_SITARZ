// to są takie #include<..>
const bodyParser = require('body-parser')
const connection = require('./modules/database')
const cors = require('cors')
const express = require('express')
const expressSession = require('express-session')

// stałe definiujące parametry połączenia
const hostname = '127.0.0.1'
const port = 8080

// zmienne serwera
const app = express()
var session = null

// "parametry" serwera
app.use(bodyParser.json()) // body będą przekazywane jako JSON
app.use(cors())
app.use(expressSession({
    secret: "Sekretne hasło serwera",
    saveUninitialized: true,
    resave: true
}))

// zmienne routingów
var loginRoutes = require('./routes/login')
var logoutRoutes = require('./routes/logout')
app.use('/login', loginRoutes.router)
app.use('/logout', logoutRoutes.router)

// przekazanie zmiennych do routingów
loginRoutes.assignSessionVariable(session)
logoutRoutes.assignSessionVariable(session)

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello node API!')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
