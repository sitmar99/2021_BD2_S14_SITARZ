const express = require('express')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

//{"id":1, "active":true, "username": "lesnik", "role": "Emploee", "first_name": "Andżej", "last_name": "Cienkopis", "salary":2800}


router.get('/', (req, res) => {
    connection.query('SELECT id, active, username, role, first_name, last_name, salary FROM users', (err,result)=> {
        if (err) throw err

        res.send(result)
        return
    })
})

router.post('/', (req, res) => {    //nowe rzeczy
    console.log(req.body)
    return
})

router.patch('/', (req, res) => {    //aktualizacja rzeczy
    console.log(req.body)
    return
})

module.exports = {
    router,
    assignSessionVariable
}