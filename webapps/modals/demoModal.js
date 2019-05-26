(function (modals, tpl) {
    modals.demoModal = {
        props: [],
        template: tpl('demoModal'),
        data: function () {
            return {
                show: true
            }
        },
        methods: {
            handleOk(e) {
                this.$close({data: 1})
            },
            handleClose(e) {
                this.$close(false)
            }
        }
    }
})(dlut.modals, dlut.tpl('modals'))
