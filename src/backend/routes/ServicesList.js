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
        var one_result = result[0]
        var one_result_string_old = JSON.stringify(one_result)
        let size = all_results.length
        for (let i = 0; i < size; i++)
        {
            var one_result_string = JSON.stringify(result[i]) //wyłapanie poszczególnych rekordów
            var columns = one_result_string.indexOf("id") // znalezienie id
            //console.log(columns)
            var ends = one_result_string.indexOf(",") // znalezienie końca id
            var one_final_result = one_result_string.substring(0, columns + 4) // dodanie "id":
            one_final_result += one_result_string.substring(columns + 4, ends + 1) // dodanie konkretnej wartości id
            columns = one_result_string.indexOf("active") // znalezienie active
            one_final_result += one_result_string.substring(columns - 1, columns + 8) // dodanie "active":
            if (one_result_string[columns + 8] == '1') // sprawdzenie czy usługa jest aktywna i dodanie odpowiedniej wartości
            {
                one_final_result += 'true,'
            }
            else
            {
                one_final_result += 'false,'
            }
            columns = one_result_string.indexOf("parent")
            one_final_result += one_result_string.substring(columns - 1, columns + 8)
            ends = one_result_string.indexOf(",", columns)
            if (one_result_string.substring(columns + 8, columns + 12) == 'null')
            {
                one_final_result += '0, \"child\": '
            }
            else
            {
                one_final_result += one_result_string.substring(columns + 8, ends + 1)
                one_final_result += "\"child\":0,"
            }
            columns = one_result_string.indexOf("name")
            ends = one_result_string.indexOf("}", columns)
            one_final_result += one_result_string.substring(columns - 1, ends + 1)
            
            one_final_result = one_final_result.replaceAll(":", ": ")
            one_final_result = one_final_result.replaceAll(",", ", ")
            console.log(one_final_result)
            //console.log(one_result_string_new.substring(position_parent, position_parent + 10))
        }
        //res.send(size + '')
        res.send(JSON.stringify(result[0]))
        
        return
    })
})


module.exports = {
    router,
    assignSessionVariable
}