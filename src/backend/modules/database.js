const mysql = require('mysql')

const con = mysql.createPool({
    host: "h2.hitme.pl",
    user: "maturazi_bd2tab",
    password: "&m99yv^PMGnV5u",
    database: "maturazi_bd2tab"
})

module.exports = con
