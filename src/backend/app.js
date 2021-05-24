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
var resourceListRoutes = require('./routes/ResourceList')
var emploeeListRoutes = require('./routes/EmploeeList')
var serviceHistoryRoutes = require('./routes/serviceHistory')
var servicesList = require('./routes/ServicesList')
app.use('/login', loginRoutes.router)
app.use('/logout', logoutRoutes.router)
app.use('/ResourceList', resourceListRoutes.router)
app.use('/EmploeeList', emploeeListRoutes.router)
app.use('/serviceHistory', serviceHistoryRoutes.router)
app.use('/ServicesList', servicesList.router)

// przekazanie zmiennych do routingów
loginRoutes.assignSessionVariable(session)
logoutRoutes.assignSessionVariable(session)
resourceListRoutes.assignSessionVariable(session)
emploeeListRoutes.assignSessionVariable(session)
serviceHistoryRoutes.assignSessionVariable(session)
servicesListRoutes.assignSessionVariable(session)

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello node API!')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
