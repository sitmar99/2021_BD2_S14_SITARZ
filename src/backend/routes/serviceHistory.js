const express = require('express')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

//{"id":1, "completed": true, "date": "12-05-2021", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717B", "price": 130}


router.get('/', (req, res) => {
    connection.query('SELECT registry.id, registry.date, users.first_name, users.last_name, registry.plate_number FROM registry JOIN users on registry.id=users.id', (err,result)=> {
        if (err) throw err

        res.send(result)
        return
    })
})

router.post('/', (req, res) => {

})


module.exports = {
    router,
    assignSessionVariable
}