const express = require('express')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

//{"id":1, "active":true, "username": "lesnik", "role": "Emploee", "first_name": "Andżej", "last_name": "Cienkopis", "salary":2800}


router.get('/', (req, res) => {
    if(session!==null){
        console.log('test')
        res.sendStatus(200)
    } else {
        console.log('niepowodzenie test')
        res.sendStatus(401)
    }
})

router.post('/', (req, res) => {
    connection.query('SELECT id, active, username, role, first_name, last_name, salary FROM users', (err,result)=> {
        if (err) throw err

        res.send(result)
        return
    })
})


module.exports = {
    router,
    assignSessionVariable
}