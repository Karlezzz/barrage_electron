import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import barrage from './Barrage/barrage_chat'
import room from './Room/room'
import axios from './Axios/axios'
export default new Vuex.Store({
  modules: {
    axios,
    barrage,
    room
  },
})
