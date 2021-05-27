const express = require('express')
const connection = require('../modules/database')
var router = express.Router()

/* zysk = wszystkie zsumowane usługi z cenami - wszystkie rzeczy w payout za ten miesiąc */

router.get('/', async (req, res) => {
    let ret = Array()

    const getProfits = new Promise((resolve, reject) => {
        var obj = {
            "report_type": "profit",
            "available": Array()
        }

        connection.query(`SELECT DISTINCT YEAR(r.date) as year FROM prices JOIN registry_services r_s on prices.service_id = r_s.service_id
        JOIN registry r on r.id = r_s.registry_id WHERE price is true;`, (err, result) => {
            if (err) throw err

            result.forEach(row => {
                obj.available.push(row.year)
            })

            ret.push(obj)
            resolve()
        })
    })

    const getStatistics = new Promise((resolve, reject) => {
        var obj = {
            "report_type": "statistics",
            "available": Array()
        }

        connection.query(`SELECT DISTINCT YEAR(r.date) as year FROM registry r;`, (err, result) => {
            if (err) throw err

            result.forEach(row => {
                obj.available.push(row.year)
            })

            ret.push(obj)
            resolve()
        })
    })

    Promise.all([getProfits, getStatistics]).then(() => {
        res.statusCode = 200
        res.send(ret)
    })
})  

router.get('/profit', (req, res) => {

})

router.get('/statistics', (req, res) => {
    
})

module.exports = {
    router//,
    // assignSessionVariable
}
