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
                "name": "Druga usługa", "price": 0 },
            { "id": 8, "active": true, "parent": 0, "child": 
                [
                    {"id": 9, "active": false, "parent": 0, "child": 0, "name": "Pierwsza pod-usługa", "price": 15}
                ], "name": "Trzecia usługa", "price": 0}
        ]`)
*/

router.get('/', (req, res) => {
    connection.query('SELECT * FROM prices p RIGHT JOIN services s ON s.id = p.service_id', (err,result)=> {
        if (err) throw err
        var all_results = result
        let size = all_results.length
        for (let i = 0; i < size; i++)
        {
            var one_result_string = JSON.stringify(result[i]) //wyłapanie poszczególnych rekordów
            var ends = one_result_string.indexOf(",") // znalezienie końca id
            var one_final_result = one_result_string.substring(0, ends + 1) // dodanie id wraz z jego wartością do finalnego stringa
            ends = one_result_string.indexOf("active") // znalezienie słowa active
            one_final_result += one_result_string.substring(ends - 1, ends + 8) //dodanie słowa active do finalnego stringa
            if (one_result_string[ends + 8] == '1') // w zależności od wartości dodanie wartości active do finalnego stringa
            {
                one_final_result += 'true,'
            }
            else
            {
                one_final_result += 'false,'
            }

            console.log(ends)
            console.log(one_final_result)
            //console.log(one_result_string_new.substring(position_parent, position_parent + 10))
        }
        //res.send(size + '')
        res.send(one_result_string_old)
        
        return
    })
})


module.exports = {
    router,
    assignSessionVariable
}