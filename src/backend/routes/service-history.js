const express = require('express')
const connection = require('../modules/database').con
const hasRole = require('../modules/role-check')
var router = express.Router()

        // var json = JSON.parse(`[
        //     {"id":1, "completed": true, "date": "12-05-2021", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717B", "price": 130, "details":
        //         [
        //             {"name": "mycie szyb", "price": "100"},
        //             {"name": "pranie", "price": 30}
        //         ]},
        //     {"id":2, "completed": false, "date": "12-07-2031", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717A", "price": 230, "details":
        //     [
        //         {"name": "mycie kół", "price": "200"},
        //         {"name": "pranie", "price": 30}
        //     ]}
        // ]`)


router.get('/', (req, res) => {
    // if (!hasRole('employee', req, res)) return

    connection.query('SELECT DISTINCT r.id, r.completed, r.date, users.first_name, users.last_name, r.plate_number, prices.price FROM registry r JOIN users ON r.user=users.id JOIN registry_services rs ON r.id=rs.registry_id JOIN prices ON prices.service_id=rs.service_id', (err,result,fields)=> {
        if (err) throw err
        
        res.send(result)
        return
    })
})

router.put('/', (req, res) => {
    // if (!hasRole('employee', req, res)) return
    console.log(req.body)
    return

})

router.patch('/', (req, res) => {
    // if (!hasRole('employee', req, res)) return
    console.log(req.body)
    return
    
    var query = 'UPDATE registry SET completed=1 WHERE id=?'
    var params = [req.body.id]
    console.log(params)
    connection.query(query, params)
})


module.exports = {
    router
}