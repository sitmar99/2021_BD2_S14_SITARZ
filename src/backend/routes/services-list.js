const express = require('express')
const connection = require('../modules/database').con
const hasRole = require('../modules/role-check')
var router = express.Router()

router.post('/', (req, res) => {
    // if (!hasRole('employee', req, res)) return

    connection.query(`INSERT INTO services (name, parent, active)
        VALUES (?, ?, ?)`, [req.body.name, req.body.parent, req.body.active], function (error, results, fields) {
            service_id = results.insertId;
        }
    )
    connection.query(`INSERT INTO prices (service_id, price)
        VALUES (?, ?)`, [service_id, req.body.price])
    return
})

router.put('/', (req, res) => {
    // if (!hasRole('employee', req, res)) return

    connection.query(`UPDATE services SET
        name = ?, parent = ?, active = ?, WHERE id = ?`,
        [req.body.name, req.body.parent, req.body.active, req.body.id])
    connection.query(`UPDATE prices SET
        price = ?, WHERE service_id = ?`
        [req.body.price, req.body.id])    
    return
})

router.get('/', (req, res) => {
    // if (!hasRole('employee', req, res)) return

    connection.query('SELECT * FROM prices p RIGHT JOIN services s ON s.id = p.service_id', (err, result)=> {
        if (err) throw err

        var all_results = result
        let size = all_results.length

        for (result in all_results) {
            delete result.service_id
            delete result.date
        }

        for (let i = 0; i < size; i++)
        {
            if (all_results[i].parent == null && i < size - 1)
            {
                var child = []
                for (let j = i + 1; j < size; j++)
                {   
                    if (all_results[j].parent == all_results[i].id)
                    {
                        var temp = { ...all_results[j], "child": null }
                        child.push(temp)
                    }           
                }
                all_results[i] = { ...all_results[i], child}
            }
        }

        res.send(all_results.filter(item => item.parent == null))
    })
})

router.put('/', (req, res) => {
    if (!hasRole('employee', req, res)) return

})

module.exports = {
    router
}