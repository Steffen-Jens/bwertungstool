import Vue from 'vue'
//import VueResource from 'vue-resource'
import App from './App.vue'
import axios from 'axios'
import { store } from './store'


Vue.config.productionTip = false
axios.defaults.baseURL = 'https://b-wertung.firebaseio.com/'


new Vue({
  el: '#app',
  store,
  render: h=> h(App)
})

/*Vue.use(VueResource)

new Vue({
  render: h => h(App),


}).$mount('#app')*/
