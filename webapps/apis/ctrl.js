(function (api) {
    api.demoApi = function () {
        return api.ajax.get('/user/:id', {
            data: {}
        })
    }
})(dlut.api)
