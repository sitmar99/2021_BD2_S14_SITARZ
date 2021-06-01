const express = require('express')
const connection = require('../modules/database')
var router = express.Router()

/* zysk = wszystkie zsumowane usługi z cenami - wszystkie rzeczy w payout za ten miesiąc */

router.get('/', async (req, res) => {
    let ret = Array()

    const getProfits = new Promise((resolve, reject) => {
        let obj = {
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
        let obj = {
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
    var ret = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    const calculatePrzychod = (month) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT SUM(price) as p FROM prices JOIN registry_services rs on prices.service_id = rs.service_id
            JOIN registry r on r.id = rs.registry_id WHERE r.completed is true AND MONTH(r.date) = ${month} AND YEAR(r.date) = ${req.query.year || 0};`, (err, result) => {
                if (err) throw err

                ret[month - 1] += result[0]?.p
                resolve()
            })
        })
    }

    const calculateRozchod = (month) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT SUM(salary) as s FROM payouts WHERE MONTH(DATE) = ${month} AND YEAR(DATE) = ${req.query.year || 0};`, (err, result) => {
                if (err) throw err

                ret[month - 1] -= result[0]?.s
                resolve()
            })
        })
    }

    const calculateDochod = new Promise((resolve, reject) => {
        let promises = []

        for (let i = 1; i <= 12; i++) {
            promises.push(calculatePrzychod(i))
            promises.push(calculateRozchod(i))
        }

        Promise.all(promises).then(() => resolve())
    })

    if (req.query.year) {
        calculateDochod.then(() => {
            res.statusCode = 200
            res.send(ret)
        })
    }
    else {
        res.sendStatus(400)
    }
})

router.get('/statistics', (req, res) => {
    if (!req.query.year) res.sendStatus(400)

    connection.query(`SELECT name, COUNT(rs.id) as c FROM services JOIN registry_services rs on services.id = rs.service_id
    JOIN registry r on r.id = rs.registry_id WHERE r.completed is true AND YEAR(r.date) = ${req.query.year} GROUP BY name;`, (err, result) => {
        if (err) throw err

        let ret = []

        result.forEach(row => {
            let obj = {
                "service_name": row.name,
                "count": row.c
            }
            ret.push(obj)
        })

        res.statusCode = 200
        res.send(ret)
    })
})

module.exports = {
    router
}
