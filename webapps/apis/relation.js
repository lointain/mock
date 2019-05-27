(function (api) {
    /**
     * 获得relation列表
     * @returns Promise([{}])
     */
    api.getRelationList = function (modelId, type) {
        return api.ajax.get('/relation', {query: {modelId, type}})
    };
    /**
     * 新建relation
     * @param modelId
     * @param data : {}
     * @returns Promise({})
     */
    api.createRelation = function (modelId, data) {
        return api.ajax.post('/relation', {data, query: {modelId}})
    };
    /**
     * 更新relation信息
     * @param relationId
     * @param data : {}
     * @returns Promise({})
     */
    api.updateRelationById = function (relationId, data) {
        return api.ajax.patch('/relation/:relationId', {params: {relationId}, data})
    };
    /**
     * 删除一个relation
     * @param relationId
     * @returns Promise({id,name})
     */
    api.deleteRelationById = function (relationId) {
        return api.ajax.delete('/relation/:relationId', {params: {relationId}})
    }
})(dlut.api);
