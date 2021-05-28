const express = require('express')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

//{"id": 2, "name": "szmata", "brand": "pol-szmat", "model": "deluxe", "quantity": 44, "unit": ""}


router.get('/', (req, res) => {
    connection.query('SELECT * FROM resources', (err,result)=> {
        if (err) throw err

        res.send(result)
        return
    })
})

router.put('/', (req, res) => {
    console.log(req.body)
    if (req.body.id == "-1") {
        connection.query(`INSERT INTO resources (name, brand, model, quantity, unit)
            VALUES ('${req.body.name}','${req.body.brand}','${req.body.model}','${req.body.quantity}','${req.body.unit}')`)
    }
    else {
        connection.query(`UPDATE resources SET
            name = '${req.body.name}',
            brand = '${req.body.brand}',
            model = '${req.body.model}',
            quantity = '${req.body.quantity}',
            unit = '${req.body.unit}'
            WHERE id = '${req.body.id}'`)
    }
})


module.exports = {
    router,
    assignSessionVariable
}