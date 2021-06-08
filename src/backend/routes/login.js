const express = require('express')
const connection = require('./../modules/database').con
var router = express.Router()

router.get('/', (req, res) => {
    if (req.session.login) {
        res.statusCode = 200
        res.send({
            "id": req.session.user_id,
            "login": req.session.login,
            "role": req.session.role,
            "first_name": req.session.first_name || "Unknown",
            "last_name": req.session.last_name || "Guy"
        })
    } else {
        res.sendStatus(401)
    }
})

router.post('/', (req, res) => {
    connection.query(`SELECT * FROM users WHERE username = '${req.body.login}';`, (err, result) => {
        if (err) throw err

        if (result[0]?.password === req.body.password) {
            req.session.user_id = result[0].id
            req.session.login = req.body.login
            req.session.role = result[0]?.role
            req.session.first_name = result[0]?.first_name
            req.session.last_name = result[0]?.last_name
            res.statusCode = 200
            res.send({
                "id": req.session.user_id,
                "login": req.session.login,
                "role": req.session.role,
                "first_name": req.session.first_name || "Unknown",
                "last_name": req.session.last_name || "Guy"
            })
        } else {
            res.statusCode = 401
            res.send('User doesn\'t exists or wrong password')
        }
    })
})

module.exports = {
    router
}