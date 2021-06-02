const express = require('express')
const connection = require('./../modules/database').con
var router = express.Router()

router.get('/', (req, res) => {
    if (req.session.login) {
        console.log(`Logged as ${req.session.login} with role ${req.session.role}`)
        res.statusCode = 200
        res.send({
            "login": req.session.login,
            "role": req.session.role,
            "first_name": req.session.first_name || "Unknown",
            "last_name": req.session.last_name || "Guy"
        })
    } else {
        console.log(`Not logged`)
        res.sendStatus(401)
    }
})

router.post('/', (req, res) => {
    connection.query(`SELECT * FROM users WHERE username = '${req.body.login}';`, (err, result) => {
        if (err) throw err

        if (result[0]?.password === req.body.password) {
            req.session.login = req.body.login
            req.session.role = result[0]?.role
            req.session.first_name = result[0]?.first_name
            req.session.last_name = result[0]?.last_name
            res.sendStatus(200)
        } else {
            res.statusCode = 401
            res.send('User doesn\'t exists or wrong password')
        }
    })
})

module.exports = {
    router
}