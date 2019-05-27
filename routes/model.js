var express = require('express');
var router = express.Router();
var modals = require('../models')

router.get('/', function (req, res, next) {
    res.json({type: 'model'})
});

module.exports = router;
