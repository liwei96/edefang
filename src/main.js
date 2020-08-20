import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import { Rate , Popup , Toast } from 'vant'
import cookie from 'vue-cookies'


import VueWechatTitle from 'vue-wechat-title'
import VueLazyLoad from 'vue-lazyload'
import dd from './assets/default.jpg'
Vue.use(VueLazyLoad,{
    error: dd,
   loading:dd
})
Vue.use(VueWechatTitle)

Vue.use(Rate)
Vue.use(Popup)
Vue.use(Toast)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$cookies = cookie

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
