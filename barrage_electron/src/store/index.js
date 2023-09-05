import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import barrage_chat from './Barrage/barrage_chat'
import enter from './Enter/enter'
import axios from './Axios/axios'
export default new Vuex.Store({
  modules: {
    axios,
    barrage_chat,
    enter
  },
})
