import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: {},
    isAuthenticated: 0
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getIsAuthenticated: state => {
      return state.isAuthenticated
    }
  },
  mutations: {
    storeToken(state, token) {
      state.token = token

      localStorage.setItem('token', JSON.stringify(state.token))
    },
    authenticate(state) {
      state.isAuthenticated = 1
    }
  },
  actions: {
    storeTokenAction(context, token) {
      context.commit('storeToken', token)
      context.commit('authenticate')
    }
  },
  modules: {
  }
})
