const express = require('express')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

//{"id":1, "completed": true, "date": "12-05-2021", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717B", "price": 130}


router.get('/', (req, res) => {
    connection.query('SELECT r.id, r.date, users.first_name, users.last_name, r.plate_number, prices.price FROM registry r JOIN users ON r.user=users.id JOIN registry_services AS rs ON r.id=rs.registry_id JOIN prices ON prices.service_id=rs.service_id', (err,result)=> {
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