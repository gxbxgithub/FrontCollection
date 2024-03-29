import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import ElementUI from 'element-ui'
// Vue.use(ElementUI)
import { Button, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './assets/element-variables.scss'
Vue.use(Button)
Vue.use(Select)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
