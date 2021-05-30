const express = require('express')
const con = require('./../modules/database')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

router.post('/', (req, res) => {
    connection.query(`INSERT INTO services (name, parent, price, active)
        VALUES ('${req.body.name}','${req.body.parent}','${req.body.price}','${req.body.active})`)
        return
})

router.put('/', (req, res) => {
    connection.query(`UPDATE services SET
        name = ?, parent = ?, active = ?, WHERE id = ?`,
        [req.body.name, req.body.parent, req.body.active, req.body.id])
    connection.query(`UPDATE prices SET
        price = ?, WHERE service_id = ?`
        [req.body.price, req.body.id])    
    return
})


    connection.query('update services set name = ?, price = ?', [req.body.name, req.body.price]);
    // service_id = connection.query('select service_seq.nextval');
    // connection.query('insert into services (id, name, price) values (?, ?, ?)', [service_id, req.body.name, req.body.price]);
    // price_id = connection.query('select price_seq.nextval');
    // connection.query('insert into prices (id, service_id, price) values (?, ?, ?)', [price_id, service_id, req.body.price]);
    connection.query('insert into services (name, price) values (?, ?)', [req.body.name, req.body.price]);
    service_id = connection.query('select LAST_INSERT_ID()');
    connection.query('insert into prices (service_id, price) values (?, ?)', [service_id, req.body.price]);


router.get('/', (req, res) => {
    connection.query('SELECT * FROM prices p RIGHT JOIN services s ON s.id = p.service_id', (err,result)=> {
        if (err) throw err
        var all_results = result
        let size = all_results.length
        for (let i = 0; i < size; i++)
        {
            delete all_results[i].service_id
            delete all_results[i].date
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
                        var temp = all_results[j]                         
                        child.push(temp)
                    }           
                }
                all_results[i] = { ...all_results[i], child}
            }
        }
        res.send(all_results.filter(item => item.parent == null))
    })
})


module.exports = {
    router,
    assignSessionVariable
}