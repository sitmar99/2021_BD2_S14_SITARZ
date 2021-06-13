const mysql = require('mysql')

const options = {
    host: "h2.hitme.pl",
    port: 3306,
    user: "maturazi_bd2tab",
    password: "&m99yv^PMGnV5u",
    database: "maturazi_bd2tab",
    multipleStatements: true
}

const con = mysql.createPool(options)

module.exports = {
    con,
    options
}
