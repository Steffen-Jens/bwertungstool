import Vue from 'vue';
import Vuex from 'vuex';
import auth_axios from "./auth_axios"
import axios from "axios"




Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    username: null,
    isAdmin: null,
    categories: []
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token,
      state.userId = userData.userId
    },
    setUser (state, userData){
      state.username = userData.username
      state.isAdmin = userData.isAdmin
    },
    closeNav(){
      document.getElementById("sidebar").style.width = "0";
      document.getElementById("mainComponent").style.paddingLeft = "0";
      document.getElementById("navbarTop").style.paddingLeft = "0";
      this.expandedNav = false;
    },
    setCategories(state, catData){
      state.categories.push({categoryName: catData.category})
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
      axios.post("/users.json" + '?auth=' + state.idToken, {username: authData.username, email: authData.email, isAdmin: authData.isAdmin/*, someArray: [{message: 'foo', value: 7},{message: 'bar', value: 8}, {message: 'hello', value: 9}]*/})
      .then(res => {
        /* eslint-disable no-console */
        console.log(res)
        commit('setUser', authData)
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
        axios.get('/users.json' + '?auth=' + res.data.idToken)
        .then(res => {
          /* eslint-disable no-console */
          console.log("GET METHOD:" + res)
          const data = res.data
          for (let key in data){
            const user = data[key]
            if (authdata.email == user.email) {
              commit('setUser', {
                username: user.username,
                isAdmin: user.isAdmin
              })
            }
          }
        })

        .catch(error => {
          this.error = error,
          console.log(error)
        })
      })
      .catch( error =>
        /* eslint-disable no-console */
        console.log(error)
        /* eslint-enable no-console */
      );
    },
    createCategory({state}, dbData){
      axios.post("/category" + dbData.subCategoryOf + ".json" + '?auth=' + state.idToken, {category: dbData.category})
      .then(res => {
        /* eslint-disable no-console */
        console.log(res)

      })
      .catch(error => {
        /* eslint-disable no-console */
        console.log(error)
      })
    },
    getCategories({commit, state}, dbData){
      axios.get('/category' + dbData.subCategoryOf + '.json' + '?auth=' + state.idToken)
      .then(res => {
        /* eslint-disable no-console */
        console.log("GET METHOD:" + res)
        const data = res.data
        for (let key in data){
          const category = data[key]
          /* eslint-disable no-console */
          console.log(category.category),
            commit('setCategories', {
              category: category.category
            })
        }
      })

      .catch(error => {
        this.error = error,
        console.log(error)
      })
    }
  },
  getters: {

  }
});
