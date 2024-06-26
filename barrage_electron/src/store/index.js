import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import barrage from './Barrage/barrage'
import room from './Room/room'
import axios from './Axios/axios'
import vote from './Vote/Vote'
import user from './User/user'
import score from './Score/Score'
import comment from './Comment/Comment'
export default new Vuex.Store({
  modules: {
    axios,
    barrage,
    room,
    vote,
    user,
    score,
    comment
  },
})
