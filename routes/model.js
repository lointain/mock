var express = require('express');
var router = express.Router();
var models = require('../models')

/**
 * 返回model列表
 * @query projectId
 * @return modelList
 */
router.get('/', function (req, res, next) {
    res.json({type: 'model'})
});

/**
 * 新建model
 * @query projectId
 * @body data
 * @return 新生成的model
 */
router.post('/', function (req, res, next) {
    res.json({type: 'model'})
});

/**
 * 获得一个modelId
 * @param modelId
 * @return modelList
 */
router.get('/:modelId', function (req, res, next) {
    res.json({type: 'model'})
});

/**
 * 修改一个model(部分信息)
 * @param modelId
 * @return 修改后的model
 */
router.patch('/:modelId', function (req, res, next) {
    res.json({type: 'model'})
});

/**
 * 删除一个model(部分信息)
 * @param pid modelId
 * @return 修改后的model
 */
router.delete('/:modelId', function (req, res, next) {
    res.json({type: 'model'})
});

module.exports = router;
