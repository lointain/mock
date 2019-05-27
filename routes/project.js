var express = require('express');
var router = express.Router();
var models = require('../models')

/**
 * 返回project列表
 * @return projectList
 */
router.get('/', function (req, res, next) {
    res.json({type: 'project'})
});

/**
 * 新建project
 * @return 新生成的project
 */
router.post('/', function (req, res, next) {
    res.json({type: 'project'})
});

/**
 * 修改一个project(部分信息)
 * @param projectId projectId
 * @return 修改后的project
 */
router.patch('/:projectId', function (req, res, next) {
    res.json({type: 'project'})
});

/**
 * 删除一个project(部分信息)
 * @param projectId projectId
 * @return 修改后的project
 */
router.delete('/:projectId', function (req, res, next) {
    res.json({type: 'project'})
});

module.exports = router;
