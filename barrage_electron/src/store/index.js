import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import barrage_chat from './Barrage/barrage_chat'
import enter from './Enter/enter'
export default new Vuex.Store({
    modules: {
        barrage_chat,
        enter
    }, 
})