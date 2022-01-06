import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '../utils/storage'

Vue.use(Vuex)

const token_key = 'toutiao'
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登陆信息
    user: getItem(token_key)
  },
  mutations: {
    serUser (state, data) {
      state.user = data
      // 為了防止丟失 需要本地存儲
      setItem(token_key, state.user)
    }
  },
  actions: {},
  modules: {}
})
