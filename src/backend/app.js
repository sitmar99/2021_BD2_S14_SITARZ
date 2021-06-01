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
var employeeListRoutes = require('./routes/employee-list')
var loginRoutes = require('./routes/login')
var logoutRoutes = require('./routes/logout')
var reports = require('./routes/reports')
var resourceListRoutes = require('./routes/resource-list')
var serviceHistoryRoutes = require('./routes/service-history')
var servicesListRoutes = require('./routes/services-list')
app.use('/employee-list', employeeListRoutes.router)
app.use('/login', loginRoutes.router)
app.use('/logout', logoutRoutes.router)
app.use('/reports', reports.router)
app.use('/resource-list', resourceListRoutes.router)
app.use('/service-history', serviceHistoryRoutes.router)
app.use('/services-list', servicesListRoutes.router)

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello node API!')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
