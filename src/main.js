import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import mixins from '@/mixins/global'

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
    async created() {            
        if(store.getters.getToken !== null) {
            try {
                const user = await this.getCurrentUser()
                
                store.dispatch('setUserDetailsAction', user)
            } catch(err) {
                router.push({name: 'login'})
            }
        }
    },
    mixins: [
        mixins
    ],
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
