import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOKEN_USER'
export default new Vuex.Store({
  state: {
    // 设定一个空数据，来接收user
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了存储持久化，转为本地存储数据
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
