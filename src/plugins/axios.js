"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '@/store'

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || process.env.apiUrl || '';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.getToken;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.VUE_APP_BASE_URL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  async error => {
    // Do something with response error
    if(error.response.status === 401){
        //check if store token has value
        // if(store.getters.getToken.length > 0 || store.getters.getToken !== null) {
        //   // Use refresh token here
        // } else {
          // alert('wkwkw')
        await store.dispatch('destroySessionAction')
        // }
    }

    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  console.log(options);
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
