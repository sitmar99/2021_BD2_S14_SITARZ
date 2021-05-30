const mysql = require('mysql')

const con = mysql.createConnection({
    host: "h2.hitme.pl",
    user: "maturazi_bd2tab",
    password: "&m99yv^PMGnV5u",
    database: "maturazi_bd2tab"
})

// połączenie z serwerem mysql
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql server...')
})

module.exports = con
