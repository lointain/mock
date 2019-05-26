(function (api) {
    api.demoApi = function () {
        return $.get('/test')
    }
})(dlut.api)
