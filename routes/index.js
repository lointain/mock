var express = require('express');
var router = express.Router();
var modals = require('../models')

router.get('/aaa', function(req, res, next) {
  console.log(modals.n)
  res.json({a:1,b:2})
});

module.exports = router;
