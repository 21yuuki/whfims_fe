import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

console.log(store)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.forAuth)) {
        if(!store.getters.getIsAuthenticated) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else if(to.matched.some(record => record.meta.forGuest)) {
        if(store.getters.getIsAuthenticated) {
            next({ name: 'home' })
        } else {
            next()
        }
    } else {
        next()
    }
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
