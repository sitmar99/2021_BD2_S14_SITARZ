const express = require('express')
const con = require('./../modules/database')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

router.get('/', (req, res) => {
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
    console.log(req.body)
})

module.exports = {
    router,
    assignSessionVariable
}