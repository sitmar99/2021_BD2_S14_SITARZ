const mysql = require('mysql')

const options = {
    host: "eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    port: 3306,
    user: "li9v6knw9wi9r2s4",
    password: "zbd8x3l95o68os90",
    database: "	v7264mir5vsp5sij",
    multipleStatements: true
}

const con = mysql.createPool(options)

module.exports = {
    con,
    options
}
