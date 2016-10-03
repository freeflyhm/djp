'use strict'

import Vue from 'vue' // 引入 vue
import App from './App' // 引入根组件

import VueResource from 'vue-resource' // 引入 vue-resource
import store from './store'
import router from './router' // 引入 vue-router

Vue.use(VueResource)  // 声明使用 vue-resource

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')

// Now the app has started!
