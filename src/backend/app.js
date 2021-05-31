// to są takie #include<..>
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const session = require('express-session')

// stałe definiujące parametry połączenia
const hostname = '127.0.0.1'
const port = 8080

// zmienne serwera
const app = express()

// "parametry" serwera
app.use(bodyParser.json()) // body będą przekazywane jako JSON
app.use(cors())
app.use(session({
    secret: "Sekretne hasło serwera",
    saveUninitialized: true,
    resave: true
}))

// zmienne routingów
var emploeeListRoutes = require('./routes/EmploeeList')
var loginRoutes = require('./routes/login')
var logoutRoutes = require('./routes/logout')
var reports = require('./routes/reports.js')
var resourceListRoutes = require('./routes/ResourceList')
var serviceHistoryRoutes = require('./routes/serviceHistory')
var servicesListRoutes = require('./routes/ServicesList')
app.use('/EmploeeList', emploeeListRoutes.router)
app.use('/login', loginRoutes.router)
app.use('/logout', logoutRoutes.router)
app.use('/reports', reports.router)
app.use('/ResourceList', resourceListRoutes.router)
app.use('/serviceHistory', serviceHistoryRoutes.router)
app.use('/ServicesList', servicesListRoutes.router)

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello node API!')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
