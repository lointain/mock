var express = require('express');
var router = express.Router();
var {Project} = require('../models')

/**
 * 返回project列表
 * @return projectList
 */
router.get('/', function (req, res, next) {
    Project.findAll().then(function (data) {
        res.json(data)
    })
});

/**
 * 新建project
 * @body data:{name}
 * @return 新生成的project
 */
router.post('/', function (req, res, next) {
    Project.create({
        name: req.body.name
    }).then(function () {
        res.json(data)
    }).catch(function (e) {
        res.json({
            error: 'false:' + e.toString()
        })
    })
});

/**
 * 修改一个project(部分信息)
 * @param projectId
 * @body data : {name}
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
    Project.destroy({
        where: {
            id: req.params.projectId
        }
    }).then(function () {
        res.json(data)
    }).catch(function (e) {
        res.json({
            error: 'false:' + e.toString()
        })
    })
});

module.exports = router;
