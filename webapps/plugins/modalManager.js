(function (plugins, modals) {
    Vue.use({
        install(Vue, options) {
            var node = document.createElement('div')
            document.body.appendChild(node)
            const modalManager = new Vue({
                components: options.modals,
                render(h) {
                    if (this.modalName)
                        return h(this.modalName, {
                            props: this.modalProps,
                            on: {
                                modalClose: this.close
                            }
                        })
                },
                methods: {
                    close(data) {
                        if (this.closeCallback)
                            this.closeCallback(data)
                        this.closeCallback = this.modalName = this.modalProps = null
                    }
                },
                data: {
                    modalName: null,
                    modalProps: null,
                }
            })
            modalManager.$mount(node)
            Vue.prototype.$open = function (name, props, callback) {
                if (typeof props === 'function')
                    callback = props
                else
                    modalManager.modalProps = JSON.parse(JSON.stringify(props))
                modalManager.modalName = name
                modalManager.closeCallback = callback.bind(this)
            }
            Vue.prototype.$close = function (data) {
                this.$emit('modalClose', data)
            }
        }
    }, modals)
})(dlut.plugins, dlut.modals)
