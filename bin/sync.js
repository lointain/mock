var Sequelize = require('sequelize');
var models  = require('../models');
models.sequelize.sync({force: true}).then(function(){
    console.log(arguments)
})
