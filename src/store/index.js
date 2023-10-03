import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from './Modules/Message'
import { Table } from './Modules/Table'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      msalApp: null,
      logindata: null,
      axios: null,
      api:null,
      currentAdmin: null
  },
  mutations: {
    msalApp(state, payload) {
       state.msalApp = payload;
    },
    currentAdmin(state, payload) {
      state.currentAdmin = payload;
    },
    logindata(state, payload) {
        state.logindata = payload;
    },
    axios(state, payload) {
        state.axios = payload;
    },
    api(state, payload){
      state.api = payload;
    }
  },
  modules: {
    Message,
    Table
  }
})
