import Vue from 'vue'
import barrageHistoryApp from './barrageHistoryApp.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import store from './store/index'

Vue.use(VueRouter)
Vue.config.productionTip = false
new Vue({
  render: h => h(barrageHistoryApp),
  router,
  store
}).$mount('#app')
