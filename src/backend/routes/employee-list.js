const express = require('express')
const connection = require('../modules/database').con
var router = express.Router()

//{"id":1, "active":true, "username": "lesnik", "role": "Emploee", "first_name": "Andżej", "last_name": "Cienkopis", "salary":2800}


router.get('/', (req, res) => {
    connection.query('SELECT id, active, username, role, first_name, last_name, salary FROM users', (err,result)=> {
        if (err) throw err

        res.send(result)
        return
    })
})

router.post('/', (req, res) => {
        connection.query(`INSERT INTO users (active, username, password, role, first_name, last_name, salary)
            VALUES ('${req.body.active}','${req.body.username}','${req.body.password}','${req.body.role}','${req.body.first_name}','${req.body.last_name}','${req.body.salary}')`)
})

router.put('/', (req, res) => {
    connection.query(`UPDATE users SET
        active = '${req.body.active}',
        username = '${req.body.username}',
        password = '${req.body.password}',
        role = '${req.body.role}',
        first_name = '${req.body.first_name}',
        last_name = '${req.body.last_name}',
        salary = '${req.body.salary}'
        WHERE id = '${req.body.id}'`)
})

module.exports = {
    router
}