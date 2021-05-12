const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bd2_s14"
})

// połączenie z serwerem mysql
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql server...')
})

module.exports = con
