(function (tpl) {
    Vue.component('demoComponent', {
        template: tpl('demoComponent'),
        methods: {
            openModal() {
                this.$open('demoModal', {}, function () {
                })
            }
        }
    })
})(dlut.tpl('components'))
