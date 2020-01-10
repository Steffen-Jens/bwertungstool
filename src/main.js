import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1'


Vue.use(VueResource)

new Vue({
  render: h => h(App),
}).$mount('#app')
