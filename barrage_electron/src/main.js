import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import echarts_ from './echart/index'
import store from './store/index'
import './api/request'
Vue.use(VueRouter)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    Vue.prototype.$bus=this
    Vue.prototype.echarts = echarts_
  }
  
}).$mount('#app')
