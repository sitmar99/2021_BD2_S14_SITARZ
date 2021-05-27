const express = require('express')
const con = require('./../modules/database')
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
        return

        /*
        for (let i = 0; i < size; i++)
        {
            var one_result_string_check = JSON.stringify(result[i]) //wyłapanie poszczególnych rekordów
            if (one_result_string_check.substring(one_result_string_check.indexOf("parent") + 8, one_result_string_check.indexOf("parent") + 12) == 'null')
            {
                var one_result_string = JSON.stringify(result[i]) //wyłapanie poszczególnych rekordów
                var columns = one_result_string.indexOf("id") // znalezienie id
                var ends = one_result_string.indexOf(",") // znalezienie końca id
                var one_final_result = '{ ' + one_result_string.substring(1, columns + 4) // dodanie "id":
                one_final_result += '\"' + one_result_string.substring(columns + 4, ends)// dodanie konkretnej wartości id
                one_final_result += '\",'
                columns = one_result_string.indexOf("active") // znalezienie active
                one_final_result += one_result_string.substring(columns - 1, columns + 8) // dodanie "active":
                if (one_result_string[columns + 8] == '1') // sprawdzenie czy usługa jest aktywna i dodanie odpowiedniej wartości
                {
                    one_final_result += '\"true\",'
                }
                else
                {
                    one_final_result += '\"false\",'
                }
                columns = one_result_string.indexOf("parent")
                one_final_result += one_result_string.substring(columns - 1, columns + 8)
                ends = one_result_string.indexOf(",", columns)
                one_final_result += '\"0\",\"child\":\n[\n'

                for (let j = i + 1; j < size; j++)
                {
                    one_result_string = JSON.stringify(result[j]) //wyłapanie poszczególnych rekordów
                    columns = one_result_string.indexOf("id") // znalezienie id
                    ends = one_result_string.indexOf(",") // znalezienie końca id
                    one_final_result = '{ ' + one_result_string.substring(1, columns + 4) // dodanie "id":
                    one_final_result += '\"' + one_result_string.substring(columns + 4, ends)// dodanie konkretnej wartości id
                    one_final_result += '\",'
                    columns = one_result_string.indexOf("active") // znalezienie active
                    one_final_result += one_result_string.substring(columns - 1, columns + 8) // dodanie "active":
                    if (one_result_string[columns + 8] == '1') // sprawdzenie czy usługa jest aktywna i dodanie odpowiedniej wartości
                    {
                        one_final_result += '\"true\",'
                    }
                    else
                    {
                        one_final_result += '\"false\",'
                    }
                    columns = one_result_string.indexOf("parent")
                    one_final_result += one_result_string.substring(columns - 1, columns + 8)
                    ends = one_result_string.indexOf(",", columns)
                    if (one_result_string.substring(columns + 8, columns + 12) == 'null')
                    {
                        one_final_result += '\"0\",\"child\":\"0\" ,'
                    }
                    else
                    {
                        one_final_result += '\"' + one_result_string.substring(columns + 8, ends)
                        one_final_result += '\",'
                        one_final_result += "\"child\":\"0\","
                    }
                    columns = one_result_string.indexOf("name")
                    ends = one_result_string.indexOf("}", columns)
                    one_final_result += one_result_string.substring(columns - 1, ends)
                    one_final_result += ","
                    columns = one_result_string.indexOf("price")
                    ends = one_result_string.indexOf(",", columns)
                    one_final_result += one_result_string.substring(columns - 1, columns + 7)
                    one_final_result += "\"" + one_result_string.substring(columns + 7, ends)
                    one_final_result += "\" }"

                }
                columns = one_result_string.indexOf("name")
                ends = one_result_string.indexOf("}", columns)
                one_final_result += one_result_string.substring(columns - 1, ends)
                one_final_result += ","
                columns = one_result_string.indexOf("price")
                ends = one_result_string.indexOf(",", columns)
                one_final_result += one_result_string.substring(columns - 1, columns + 7)
                one_final_result += "\"" + one_result_string.substring(columns + 7, ends)
                one_final_result += "\" }"
                one_final_result = one_final_result.replaceAll(",", " , ")
                one_final_result = one_final_result.replaceAll("}", "},")
                all_new_results += one_final_result + '\n'  
            }
        }
        all_new_results = all_new_results.slice(0, all_new_results.length - 2)
        all_new_results += '\n]}'
        var new_result = JSON.parse(all_new_results)*/

    })
})


module.exports = {
    router,
    assignSessionVariable
}