(function (plugins) {
    var eventBus = new Vue()
    Vue.use({
        install(Vue, options) {
            Vue.mixin({
                beforeCreate() {
                    if (this.$options.events) {
                        // console.log('eventBus', this.$options.name)
                        for (var eventName in this.$options.events) {
                            this.$options.events[eventName] = this.$options.events[eventName].bind(this)
                            eventBus.$on(eventName, this.$options.events[eventName])
                        }
                    }
                },
                beforeDestroy: function () {
                    if (this.$options.events) {
                        for (var eventName in this.$options.events) {
                            eventBus.$off(eventName, this.$options.events[eventName])
                        }
                    }
                }
            })
            Vue.prototype.eventBus = eventBus
            Vue.prototype.$trigger = eventBus.$emit.bind(eventBus)
        },
        eventBus
    })
})(dlut.plugins)
