<template>
  <div>
    <br>
    <div class="row user-account">
      <div class="col-sm-1"></div>
      <div class="col-sm-5 login">
        <h4>Sign in</h4>
        <form method="post" class="login-form" id="login-form">
          Email: <input id="loginEmail" type="email" name="loginEmail" @keyup.enter="login" v-model="loginEmail">
          <br>
          Password: <input id="loginPassword" type="password" name="loginPassword" @keyup.enter="login" v-model="loginPassword">
          <br>
          <div class="button-container">
            <span class="mas">Sign in</span>
            <button id='work' type="button" name="Hover" @click="login">Sign in</button>
          </div>
        </form>
        <div id="error">{{logErrorMessage}}</div>
      </div>
      <div class="col-sm-5 registration">
        <h4>Sign up</h4>
        <form method="post" class="registration-form" id="registration-form">
          Email: <input type="email" name="email" @keyup.enter="register" v-model="regEmail"><br>
          Username: <input type="text" name="username" @keyup.enter="register" v-model="regUsername"><br>
          Password: <input type="password" name="password" @keyup.enter="register" v-model="regPassword"><br>
          Repeat Password: <input type="password" name="repeatPassword" @keyup.enter="register" v-model="regRepeatPassword"><br>
          <div class="button-container">
            <span class="mas">Sign up</span>
            <button id='work' type="button" name="Hover" @click="register">Sign up</button>
          </div>
        </form>
        <br>
        <div id="error">{{regErrorMessage}}</div>
      </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>

<script>

import { sha256 } from 'js-sha256';

export default{

  data() {
    return{
      loginEmail: "",
      loginPassword: "",
      regEmail: "",
      regUsername: "",
      regPassword: "",
      regRepeatPassword: "",
      regIsAdmin: false,
      regErrorMessage: "",
      logErrorMessage: ""
    }
  },
  methods: {

    login(){
      /*  const newUserData = {
      email: authData.loginEmail,
      password: authData.loginPassword,
      returnSecureToken: true
    }
    */

    this.$store.dispatch('login', {email: this.loginEmail, password: sha256(this.loginPassword), returnSecureToken: true})
    setTimeout(() => {
      this.logErrorMessage = this.$store.state.errorMessage
    }, 800)

  },
  register(){
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (this.regEmail != "" && this.regUsername != "") {
      if(this.regPassword == this.regRepeatPassword){
        if(regex.test(this.regPassword)){
          /*    const newUserData = {
          email: authData.regEmail,
          password: authData.regPassword,
          returnSecureToken: true
        }
        */
        this.$store.dispatch('register', {email: this.regEmail, username: this.regUsername, password: sha256(this.regPassword), isAdmin: this.regIsAdmin, returnSecureToken: true})
        setTimeout(() => {
          this.regErrorMessage = this.$store.state.errorMessage
        }, 800)

      }else{
        /* eslint-disable no-console */
        this.regErrorMessage = "The entered password is not strong enough. Please make sure to use a capital letter, a lower case letter, a number and a password length of at least 8 characters."
      }
    }else{
      this.regErrorMessage = "The entered passwords don't match."
    }
  }else{
    this.errorMessage = "Every field is mandatory for registration."
  }
}
},
created: function (){
  this.$store.commit('closeNav')
}
}

</script>
