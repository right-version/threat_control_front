import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    response: undefined
  },
  mutations: {
    setResponse: (state, response) => {
      state.response = response
    }
  },
  actions: {
  },
  modules: {
  }
})
