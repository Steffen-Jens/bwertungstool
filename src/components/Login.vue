<template>
  <div>
    <div class="row user-account">
      <div class="col-sm-6 login">
        <h4>Sign in</h4>
        <form method="post" class="login-form" id="login-form">
          Email: <input id="loginEmail" type="email" name="loginEmail" @keyup.enter="login" v-model="loginEmail">
          <br>
          Password: <input id="loginPassword" type="password" name="loginPassword" @keyup.enter="login" v-model="loginPassword">
          <br>
          <div id="login-btn" class="btn btn-animation" name="submit-login" @click="login"><span>Sign in</span></div><br>
        </form>
        <div><p id="login-error"> </p></div>
      </div>
      <div class="col-sm-6 registration">
        <h4>Sign up</h4>
        <form method="post" class="registration-form" id="registration-form">
          Email: <input type="email" name="email" @keyup.enter="register" v-model="regEmail"><br>
          Username: <input type="text" name="username" @keyup.enter="register" v-model="regUsername"><br>
          Password: <input type="password" name="password" @keyup.enter="register" v-model="regPassword"><br>
          Repeat Password: <input type="password" name="repeatPassword" @keyup.enter="register" v-model="regRepeatPassword"><br>
          <div id="registration-btn" class="btn btn-animation" name="submit-registration" @click="register"><span>Sign up</span></div><br>
        </form>
        <div><p id="registration-error"> </p></div>
      </div>
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
      regIsAdmin: false
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


  },
  register(){
    if(this.regPassword == this.regRepeatPassword){
      /*    const newUserData = {
      email: authData.regEmail,
      password: authData.regPassword,
      returnSecureToken: true
    }
    */
    this.$store.dispatch('register', {email: this.regEmail, username: this.regUsername, password: sha256(this.regPassword), isAdmin: this.regIsAdmin, returnSecureToken: true})

  } else{
    // Error message here
  }
}
},
created: function (){
  this.$store.commit('closeNav')
}
}

</script>
