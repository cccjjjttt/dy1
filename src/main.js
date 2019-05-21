import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'lib-flexible/flexible.js'
Vue.use(VueAxios,axios)
Vue.config.productionTip = false
import router from './router/index.js'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


