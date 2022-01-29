const express = require('express');
const path = require('path')
const fs = require('fs')
const router = express.Router();

/* GET home page. */
const dataPath = path.join(__dirname, '..', 'data', 'data.json')

router.get('/', function (req, res, next) {
  let data = fs.readFileSync(dataPath, 'utf-8')
  data = JSON.parse(data)
  data.sort(value => value.complate ? 1 : -1)
  res.render('pages/index', { title: "todo", data: data })

});

module.exports = router;
