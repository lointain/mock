(function (dlut) {
    dlut.router = new VueRouter({
        routes: [
            {path: '/', component: dlut.views.homePage}
        ]
    })
})(dlut)
