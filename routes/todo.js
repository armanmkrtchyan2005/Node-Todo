const express = require('express');
const path = require('path')
const fs = require('fs')

const router = express.Router();

/* Post todo page. */
const dataPath = path.join(__dirname, '..', 'data', 'data.json')

router.post('/todos', function (req, res, next) {
    const id = Math.floor(Math.random() * 5e5)
    fs.readFile(dataPath, 'utf-8', (err, jsonStrData) => {
        if (err) throw err
        let jsonData = JSON.parse(jsonStrData)
        const pushedObj = { value: req.body.value, id: id, complete: false }
        jsonData.push(pushedObj)
        fs.writeFileSync(dataPath, JSON.stringify(jsonData))
    })
    res.redirect('/')
})

router.post('/todo/delete/:id', function (req, res, next) {
    let data = fs.readFileSync(dataPath, 'utf-8')
    data = JSON.parse(data)

    const filterData = data.filter((item) => item.id != req.params.id)

    fs.writeFileSync(dataPath, JSON.stringify(filterData))

    res.redirect('/')
})

router.post('/todo/setComplete/:id', function (req, res, next) {
    let data = fs.readFileSync(dataPath, 'utf-8')
    data = JSON.parse(data)

    const setComplete = data.map((item) => {
        if (item.id == req.params.id) {
            item.complete = !item.complete
        }
        return item
    })

    fs.writeFileSync(dataPath, JSON.stringify(setComplete))

    res.redirect('/')
})

module.exports = router;