const express = require('express')
const connection = require('../modules/database').con
const hasRole = require('../modules/role-check')
const crypto = require('crypto')
var router = express.Router()

//{"id":1, "active":true, "username": "lesnik", "role": "Emploee", "first_name": "Andżej", "last_name": "Cienkopis", "salary":2800}


router.get('/', (req, res) => {
    // if (!hasRole('admin', req, res)) return

    connection.query('SELECT id, active, username, role, first_name, last_name, salary FROM users', (err,result)=> {
        if (err) throw err

        res.send(result)
        return
    })
})

router.post('/', (req, res) => {
    if (!hasRole('admin', req, res)) return

    connection.query(`INSERT INTO users (active, username, password, role, first_name, last_name, salary)
        VALUES ('${req.body.active}',
            '${req.body.username}',
            '${crypto.createHash('md5').update(req.body.password).digest('hex')}',
            '${req.body.role}',
            '${req.body.first_name}',
            '${req.body.last_name}',
            '${req.body.salary}'
        )`
    )
})

router.put('/', (req, res) => {
    if (!hasRole('admin', req, res)) return

    connection.query(`UPDATE users SET
        active = '${req.body.active}',
        username = '${req.body.username}',
        password = '${crypto.createHash('md5').update(req.body.password).digest('hex')}',
        role = '${req.body.role}',
        first_name = '${req.body.first_name}',
        last_name = '${req.body.last_name}',
        salary = '${req.body.salary}'
        WHERE id = '${req.body.id}'`
    )
})

module.exports = {
    router
}