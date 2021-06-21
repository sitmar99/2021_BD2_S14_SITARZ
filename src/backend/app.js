// to są takie #include<..>
const bodyParser = require('body-parser')
const cors = require('cors')
const database = require('./modules/database')
const express = require('express')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

// stałe definiujące parametry połączenia
const port = process.env.PORT || 8080

// zmienne serwera
const app = express()
const sessionStore = new MySQLStore(database.options)

// "parametry" serwera
app.use(bodyParser.json()) // body będą przekazywane jako JSON
app.use(cors({
    origin: [
        'http://127.0.0.1:3000',
        'http://localhost:3000' 
    ],
    credentials: true
}))
app.use(session({
    key: 'session_cookie',
    secret: 'session_cookie_Secret',
    saveUninitialized: false,
    resave: false,
    store: sessionStore
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

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})
