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
    if (!hasRole('employee', req, res)) return
    //connection.query('SELECT DISTINCT r.id, r.completed, DATE_FORMAT(r.date, "%Y-%m-%d") as date, users.first_name, users.last_name, r.plate_number, prices.price FROM registry r JOIN users ON r.user=users.id JOIN registry_services rs ON r.id=rs.registry_id JOIN prices ON prices.service_id=rs.service_id', (err,result,fields)=> {
    connection.query('SELECT DISTINCT r.id, r.completed, DATE_FORMAT(r.date, "%Y-%m-%d") as date, users.first_name, users.last_name, r.plate_number, prices.price, services.name FROM registry r JOIN users ON r.user=users.id JOIN registry_services rs ON r.id=rs.registry_id JOIN prices ON prices.service_id=rs.service_id JOIN services ON rs.service_id=services.id', (err,result,fields)=> {
    
    if (err) throw err
        
    var all_results = result

    let size = all_results.length
    for (let i = 0; i < size; i++)
    {
        var details = []
        var tmp = {"price": all_results[i].price}
          tmp.name = ( all_results[i].name)
          details.push(tmp)
        for (let j = i + 1; j < size; j++)
        {   
            if (all_results[j].id == all_results[i].id)
            {
                var temp = {"price": all_results[j].price}
                temp.name = ( all_results[j].name)
                details.push(temp)
                all_results.splice(j, 1)
                size--
                j--
            }           
        }
        all_results[i] = { ...all_results[i], details}
    }

    for (let i = 0; i < size; i++) {
        delete all_results[i].price
        delete all_results[i].name
    }

    res.send(all_results)
    })
})

router.post('/', (req, res) => {
    if (!hasRole('employee', req, res)) return

    console.log(req.body)
    var query=''
    //  add new registry record 
    var query = `INSERT INTO registry (date, user, plate_number, completed) VALUES('${req.body.date}', '${req.session.user_id}', '${req.body.plate_number}', '0');`

    //  add registry-service records
    for(var i = 0; i < req.body.services.length; i++)
    {
        query += `
        INSERT INTO registry_services(registry_id, service_id) VALUES((SELECT r.id FROM registry r WHERE r.date='${req.body.date}' AND r.user='${req.session.user_id}' AND r.plate_number='${req.body.plate_number}'), '${req.body.services[i].id}');`
    }
    //console.log(query)

    connection.query(query, req.body.id)
})

router.patch('/', (req, res) => {
    if (!hasRole('employee', req, res)) return

    //  update registry record to completed
    var query = 'UPDATE registry SET completed=1 WHERE id=?; '

    console.log(req.body)

    //  loop for multiple resources bd query
    for(var i = 0; i < req.body.resources.length; i++)
    {
        query += `INSERT INTO registry_resources(registry_id, resource_id) VALUES('${req.body.id}', '${req.body.resources[i].id}'); `
        query += `UPDATE resources SET quantity = quantity - '${req.body.resources[i].quantity}', ) WHERE name='${req.body.resources[i].name}'; `
    }


    console.log(query)
    connection.query(query, req.body.id)
})

module.exports = {
    router
}
