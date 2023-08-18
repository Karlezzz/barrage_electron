import Vue from 'vue'
import BarrageApp from './BarrageApp.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import store from './store/index'

Vue.use(VueRouter)
Vue.config.productionTip = false
new Vue({
  render: h => h(BarrageApp),
  router,
  store
}).$mount('#app')
