const express = require('express')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

/* { "id": 1, "active": false, "parent": 0, "child": 0, "name": "Pierwsza usługa", "price": 150 },
{
    "id": 2,
    "active": true,
    "child":
      [
        { "id": 3, "active": true, "parent": 2, "child": 0, "name": "Pierwsza pod-usługa", "price": 25 },
        { "id": 4, "active": true, "parent": 2, "child": 0, "name": "Druga pod-usługa", "price": 50 },
        { "id": 5, "active": true, "parent": 2, "child": 
          [
              { "id": 6, "active": true, "parent": 5, "child":
                  [
                      { "id": 7, "active": true, "parent": 6, "child": 0, "name": "Pierwsza pod-pod-pod-usługa", "price": 250 }
                  ], 
                  "name": "Pierwsza pod-pod-usługa", "price": 0 }
          ], 
          "name": "Trzecia pod-usługa", "price": 0 }
      ],
      "name": "Druga usługa", "price": 0 }
*/

router.get('/', (req, res) => {
    connection.query('SELECT * FROM prices p RIGHT JOIN services s ON s.id = p.service_id', (err,result)=> {
        if (err) throw err
        var all_results = result
        var one_result = result[0]
        var one_result_string = JSON.stringify(one_result)
        let size = all_results.length
        //res.send(size + '')
        res.send(one_result_string)
        
        return
    })
})


module.exports = {
    router,
    assignSessionVariable
}