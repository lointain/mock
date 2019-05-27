var express = require('express');
var router = express.Router();
var models = require('../models')

/**
 * 返回relation列表
 * @query *modelId
 * @query type=(hasOne|hasMany|belongsTo|belongsToMany)
 * @return relationList
 */
router.get('/', function (req, res, next) {
    res.json({type: 'relation'})
});

/**
 * 新建relation
 * @query *modelId
 * @return 新生成的relation
 */
router.post('/', function (req, res, next) {
    res.json({type: 'relation'})
});

/**
 * [可能不使用]修改一个relation(部分信息)
 * @param  *relationId
 * @return 修改后的relation
 */
router.patch('/:relationId', function (req, res, next) {
    res.json({type: 'relation'})
});

/**
 * 删除一个relation(部分信息)
 * @param *relationId
 * @return 修改后的relation
 */
router.delete('/:relationId', function (req, res, next) {
    res.json({type: 'relation'})
});


module.exports = router;
