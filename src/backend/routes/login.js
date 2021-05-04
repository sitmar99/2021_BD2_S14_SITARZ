const express = require('express')
const con = require('./../modules/database')
var router = express.Router()

router.post('/', (req, res) => {
    con.query(`SELECT * FROM users WHERE username = '${req.body.login}';`, (err, result) => {
        if (err) throw err;

        console.log(req.body)

        if (result.length > 0 && result[0].password === req.body.password) {
            res.sendStatus(200);
        } else {
            res.statusCode = 401;
            res.send('User doesn\'t exists or wrong password')
        }
    })
})

module.exports = router
