const express = require('express')
const connection = require('../modules/database').con
const hasRole = require('../modules/role-check')
var router = express.Router()

//{"id": 2, "name": "szmata", "brand": "pol-szmat", "model": "deluxe", "quantity": 44, "unit": ""}


router.get('/', (req, res) => {
    if (!hasRole('pracownik', req, res)) return

    connection.query('SELECT * FROM resources', (err,result)=> {
        if (err) throw err

        res.send(result)
        return
    })
})

router.post('/', (req, res) => {
    if (!hasRole('pracownik', req, res)) return

    connection.query(`INSERT INTO resources (name, brand, model, quantity, unit)
        VALUES ('${req.body.name}','${req.body.brand}','${req.body.model}','${req.body.quantity}','${req.body.unit}')`)
})

router.put('/', (req, res) => {
    if (!hasRole('pracownik', req, res)) return
    connection.query(`UPDATE resources SET
        name = '${req.body.name}',
        brand = '${req.body.brand}',
        model = '${req.body.model}',
        quantity = '${req.body.quantity}',
        unit = '${req.body.unit}'
        WHERE id = '${req.body.id}'`
    )
})


module.exports = {
    router
}