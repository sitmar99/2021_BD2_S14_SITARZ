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

router.post('/', (req, res) => {
    // connection.query('SELECT * FROM resources', (err,result)=> {
    //     if (err) throw err
    //
    //    res.send(result)
    //    return
    //})
})


module.exports = {
    router,
    assignSessionVariable
}