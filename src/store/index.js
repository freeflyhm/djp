'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins'

Vue.use(Vuex)

export const LOCAL_KEY = 'user'
export const _DEFAULT_USER = {
  city: 'sz',
  name: '',
  password: ''
}

const store = new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem(LOCAL_KEY)) || _DEFAULT_USER,
    showUser: false,
    list: []
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_SHOW: (state, showUser) => {
      state.showUser = showUser
    },
    SET_LIST: (state, list) => {
      state.list = list
    },
    SET_ITEM: (state, { index, item }) => {
      Vue.set(state.list, index, item)
    }
  },
  plugins
})

export default store
