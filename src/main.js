import Vue from 'vue'
//import VueResource from 'vue-resource'
import App from './App.vue'
import axios from 'axios'
import { store } from './store'
import firebase from 'firebase'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://b-wertung.firebaseio.com/'

var firebaseConfig = {
    apiKey: "AIzaSyA6Ycy0RhubkRh4Sjf2Hi76ZtwFBMMPkHo",
    authDomain: "b-wertung.firebaseapp.com",
    databaseURL: "https://b-wertung.firebaseio.com",
    projectId: "b-wertung",
    storageBucket: "b-wertung.appspot.com",
    messagingSenderId: "250833821528",
    appId: "1:250833821528:web:11d16ff4a9007e8133cf2d",
    measurementId: "G-6GLD0PTLMF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  el: '#app',
  store,
  render: h=> h(App)
})

/*Vue.use(VueResource)

new Vue({
  render: h => h(App),


}).$mount('#app')*/
