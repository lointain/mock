(function (api) {
    /**
     * 获得model列表
     * @param projectId
     * @returns Promise([{}])
     */
    api.getModelList = function (projectId) {
        return api.ajax.get('/model', {query: {projectId}})
    };
    /**
     * 获得一个model的信息
     * @param modelId
     * @returns Promise([{}])
     */
    api.getModelList = function (modelId) {
        return api.ajax.get('/model/:modelId', {params: {modelId}})
    };
    /**
     * 新建model
     * @param projectId
     * @param data : {}
     * @returns Promise({})
     */
    api.createModel = function (projectId, data) {
        return api.ajax.post('/model', {data, query: {projectId}})
    };
    /**
     * 更新model信息
     * @param modelId
     * @param data : {}
     * @returns Promise({})
     */
    api.updateModelById = function (modelId, data) {
        return api.ajax.patch('/model/:modelId', {params: {modelId}, data})
    };
    /**
     * 删除一个model
     * @param modelId
     * @returns Promise({id,name})
     */
    api.deleteModelById = function (modelId) {
        return api.ajax.delete('/model/:modelId', {params: {modelId}})
    }
})(dlut.api);
