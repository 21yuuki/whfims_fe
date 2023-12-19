import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    tokenExpiry: localStorage.getItem('tokenExpiry') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: localStorage.getItem('isAuthenticated') || 0,
    userDetails: {},
    cart: [],
    orderDetails: []
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getTokenExpiry: state => {
      return state.tokenExpiry
    },
    getRefreshToken: state => {
      return state.refreshToken
    },
    getIsAuthenticated: state => {
      return JSON.parse(state.isAuthenticated)
    },
    getUserDetails: state => {
      return state.userDetails
    },
    getCartItems: state => {
      return state.cart
    },
    getOrderDetails: state => {
      return state.orderDetails
    }
  },
  mutations: {
    storeToken(state, token) {
      state.token = token.access_token
      state.tokenExpiry = token.expires_in
      state.refreshToken = token.refresh_token
      state.isAuthenticated = 1

      localStorage.setItem('token', state.token)
      localStorage.setItem('tokenExpiry', state.tokenExpiry)
      localStorage.setItem('refreshToken', state.refreshToken)
      localStorage.setItem('isAuthenticated', state.isAuthenticated)

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
    },
    setToken(state, token) {
      state.token = token
    },
    setTokenExpiry(state, tokenExpiry) {
      state.tokenExpiry = tokenExpiry
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    },
    setToken(state, token) {
      state.token = token
    },
    destroySession(state) {
      state.token = null
      state.tokenExpiry = null
      state.refreshToken = null
      state.isAuthenticated = 0

      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiry')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('isAuthenticated')
    },
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails
    },
    setCartItems(state, cartItems) {
      state.cart = cartItems
    },
    removeCartItem(state, index) {
      state.cart.splice(index, 1)
    },
    setOrderDetails(state, orderDetails) {
      state.orderDetails = orderDetails
    }
  },
  actions: {
    async storeTokenAction(context, token) {
      context.commit('storeToken', token)
    },
    async setTokenAction(context, token) {
      context.commit('setToken', token)
    },
    async destroySessionAction(context) {
      context.commit('destroySession')
    },
    async reSetToken(context, payload) {
      context.commit('setToken', payload.token)
      context.commit('setTokenExpiry', payload.tokenExpiry)
      context.commit('setRefreshToken', payload.refreshToken)
      context.commit('setIsAuthenticated', payload.isAuthenticated)
    },
    async setUserDetailsAction(context, userDetails) {
      context.commit('setUserDetails', userDetails)
    },
    async setCartItemsAction(context, cartItems) {
      context.commit('setCartItems', cartItems)
    },
    removeCartItemAction(context, index) {
      context.commit('removeCartItem', index)
    },
    setOrderDetailsAction(context, orderDetails) {
      context.commit('setOrderDetails', orderDetails)
    }
  },
  modules: {
  }
})
