const express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    console.log(`Logged out ${req.body.login}`)
    req.session.destroy((err) => { if (err) return console.log(err) })
    res.sendStatus(200)
})

module.exports = {
    router
}
