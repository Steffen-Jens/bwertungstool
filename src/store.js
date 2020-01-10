import Vue from 'vue';
import Vuex from 'vuex';
import auth_axios from "./auth_axios"
import axios from "axios"




Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    username: null
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token,
      state.userId = userData.userId
    },
    setUsername (state, userName){
      state.username = userName.userName
    }
  },
  actions: {
    register ({commit, dispatch}, authData) {
      auth_axios.post("/accounts:signUp?key=AIzaSyA6Ycy0RhubkRh4Sjf2Hi76ZtwFBMMPkHo", {email: authData.email, password: authData.password})
      .then(res =>{
        /* eslint-disable no-console */
        console.log(res),
        /* eslint-enable no-console */
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
        dispatch('storeUser', authData)
      })
      .catch( error =>
        /* eslint-disable no-console */
        console.log(error)
        /* eslint-enable no-console */
      );

    },
    storeUser({commit, state}, authData){
      axios.post("/users.json" + '?auth=' + state.idToken, {username: authData.username, email: authData.email})
      .then(res => {
        /* eslint-disable no-console */
        console.log(res)
        commit('setUsername', authData.username)
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.log(error)
      })
    },
    login ({commit}, authdata) {
      auth_axios.post("/accounts:signInWithPassword?key=AIzaSyA6Ycy0RhubkRh4Sjf2Hi76ZtwFBMMPkHo", authdata)
      .then(res => {
        /* eslint-disable no-console */
        console.log(res),
        console.log("Token: " + res.data.idToken + " ID: " + res.data.localId),
        /* eslint-enable no-console */
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
      })
      .catch( error =>
        /* eslint-disable no-console */
        console.log(error)
        /* eslint-enable no-console */
      );
    },
  },
  getters: {

  }
});
