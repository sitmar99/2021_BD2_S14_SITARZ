const express = require('express')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

router.get('/', (req, res) => {
    if (session !== null) {
        console.log(`Logged as ${session.login}`)
        res.sendStatus(200)
    } else {
        console.log(`Not logged`)
        res.sendStatus(401)
    }
})

router.post('/', (req, res) => {
    connection.query(`SELECT * FROM users WHERE username = '${req.body.login}';`, (err, result) => {
        if (err) throw err

        if (result[0]?.password === req.body.password) {
            session = req.session
            session.login = req.body.login
            res.sendStatus(200)
        } else {
            res.statusCode = 401
            res.send('User doesn\'t exists or wrong password')
        }
    })
})

module.exports = {
    router,
    assignSessionVariable
}
