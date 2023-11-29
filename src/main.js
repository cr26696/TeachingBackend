import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

Axios.defaults.baseURL = '/apis'
Axios.defaults.headers.post['Content-Type'] = 'application/json'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
