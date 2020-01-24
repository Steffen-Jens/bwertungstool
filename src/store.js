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
    email: null,
    isAdmin: null,
    categories: [],
    superCategory: '',
    errorMessage: null,
    menuExpanded: false,
    articles: []
  },
  //############################################################################
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
      document.getElementById("mainComponent").style.paddingLeft = "20px";
      document.getElementById("navbarTop").style.paddingLeft = "0";
      this.expandedNav = false;
    },
    openNav(){

      var x = window.matchMedia("(max-width: 992px)");
      if (x.matches) {
        document.getElementById("sidebar").style.width = "100%";
        document.getElementById("sidebar").style.marginTop = "78px";
        document.getElementById("navbarTop").style.transition = "0.5s";
        document.getElementById("navbarTop").style.paddingLeft = "105%";
      } else {
        var margin = "20.5%";
        var padding = "22.5%";
        document.getElementById("sidebar").style.width = margin;
        document.getElementById("mainComponent").style.paddingLeft = padding;

      }
    },
    setCategories(state, catData){
      state.categories.push({categoryName: catData.category})
    },
    paddingMainContent(state){
      if(state.menuExpanded == false){
        document.getElementById("mainComponent").style.marginTop="100px";
        state.menuExpanded = true
      }else if (state.menuExpanded == true){
        /* eslint-disable no-console */
        console.log("jaaaaaa")
        document.getElementById("mainComponent").style.marginTop="0px";
        state.menuExpanded = false
      }
    },
    setArticles(state, articles){
      state.articles.push({name: articles.name, brand: articles.brand, description: articles.description})
    }
  },
  //############################################################################
  actions: {
    //-------------------------- Add user to Authentcation in firebase
    register ({dispatch, commit, state}, authData) {
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
        state.errorMessage = ""
        state.email = authData.email
      })
      .catch( error => {
        /* eslint-disable no-console */
        console.log(error.response.data.error.message)

        if (error.response.data.error.message == 'EMAIL_EXISTS') {
          state.errorMessage = "A user with this email address already exists."
        }else if (error.response.data.error.message == 'INVALID_EMAIL') {
          state.errorMessage = "This email address is invalid."
          //commit('setErrorMessage', {errorMessage: "This email address is invalid."})
        }else{
          state.errorMessage = "Wooops... Something went wrong. Please try again later."
        }
      }
    );
    return {};
  },
  //-------------------------- Store User in Realtime Database of firebase
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
  //-------------------------- Log user in and get User Data
  login ({commit, state}, authdata) {
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
      state.email = authdata.email
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
      state.errorMessage = ""
    })
    .catch( error => {

      /* eslint-disable no-console */
      console.log(error.response.data.error.message)

      if (error.response.data.error.message == 'INVALID_PASSWORD') {
        state.errorMessage = "This Password is not correct. Please try again."
      } else if (error.response.data.error.message == 'EMAIL_NOT_FOUND') {
        state.errorMessage = "There is no account with this email address. Please sign up to create an account."
      } else if (error.response.data.error.message == "USER_DISABLED"){
        state.errorMessage = "This account has been blocked. Please contact the support to restore it."
      } else if (error.response.data.error.message == 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.'){
        state.errorMessage = "Too many unsuccessful login attempts. Please try again later."
      }
    }
    )
  },
  //-------------------------- Save new Category in Realtime Database of firebase
  createCategory({dispatch, state}, dbData){
    axios.post("/category" + state.superCategory + ".json" + '?auth=' + state.idToken, {category: dbData.category})
    .then(res => {
      /* eslint-disable no-console */
      console.log(res)
      while(state.categories.length > 0) {state.categories.pop()}
      dispatch("getCategories")
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.log(error)
    })
  },
  //-------------------------- Get Category from Realtime Database of firebase
  getCategories({commit, state}){
    axios.get('/category' + state.superCategory + '.json' + '?auth=' + state.idToken)
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
  },
  //-------------------------- Get Key of Supercategory to make list of Subcategories possible
  getCategoriesKey({state, dispatch}, superCat){
    axios.get('/category' + state.superCategory + '.json' + '?auth=' + state.idToken)
    .then(res => {
      /* eslint-disable no-console */
      console.log("GET METHOD:" + res)
      const data = res.data
      for (let key in data){
        const categories = data[key]
        //console.log("Key: " + key)
        if(categories.category == superCat.subCategoryOf){
          state.superCategory = state.superCategory + '/' + key
          while(state.categories.length > 0) {state.categories.pop()}
          dispatch("getCategories")
        }
      }
    })
    .catch(error => {
      this.error = error,
      console.log(error)
    })
  },
  getArticles({commit, state}){
    axios.get("category" + state.superCategory +'/article.json')
    .then(res => {
      /* eslint-disable no-console */
      console.log("GET METHOD:" + res)
      const data = res.data
      for (let key in data){
        const category = data[key]
        /* eslint-disable no-console */
        console.log(category.article),
        commit('setArticles', {
          name: category.name,
          brand: category.brand,
          description: category.description
        })
      }
    })

    .catch(error => {
      this.error = error,
      console.log(error)
    })
  }
},
//############################################################################
getters: {

}
});
