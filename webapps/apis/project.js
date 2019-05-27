(function (api) {
    /**
     * 获得project列表
     * @returns Promise([{id,name}])
     */
    api.getProjectList = function () {
        return api.ajax.get('/project')
    };
    /**
     * 新建project
     * @param data : {name}
     * @returns Promise({id,name})
     */
    api.createProject = function (data) {
        return api.ajax.post('/project', {data})
    };
    /**
     * 更新project信息
     * @param projectId
     * @param data : {name}
     * @returns Promise({id,name})
     */
    api.updateProjectById = function (projectId, data) {
        return api.ajax.patch('/project/:projectId', {params: {projectId}, data})
    };
    /**
     * 删除一个project
     * @param projectId
     * @returns Promise({id,name})
     */
    api.deleteProjectById = function (projectId) {
        return api.ajax.delete('/project/:projectId', {params: {projectId}})
    }
})(dlut.api);
