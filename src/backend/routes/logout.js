const express = require('express')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

router.get('/', (req, res) => {
    req.session.destroy((err) => { if (err) return console.log(err) })
    session = req.session;
    res.sendStatus(200)
})

module.exports = {
    router,
    assignSessionVariable
}
