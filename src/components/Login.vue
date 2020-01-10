<template>
  <div>
    <div class="row user-account">
      <div class="col-sm-6 login">
        <h4>Login</h4>
        <form method="post" class="login-form" id="login-form">
          Email: <input id="loginEmail" type="email" name="loginEmail" v-model="loginEmail">
          <br>
          Password: <input id="loginPassword" type="password" name="loginPassword" v-model="loginPassword">
          <br>
          <input id="login-btn" class="submit btn" type="button" name="submit-login" value="Log in" @click="login"><br>
        </form>
        <div><p id="login-error"> </p></div>
      </div>
      <div class="col-sm-6 registration">
        <h4>Registration</h4>
        <form method="post" class="registration-form" id="registration-form">
          Email: <input type="email" name="email" v-model="regEmail"><br>
          Username: <input type="text" name="username" v-model="regUsername"><br>
          Password: <input type="password" name="password" v-model="regPassword"><br>
          Repeat Password: <input type="password" name="repeatPassword" v-model="regRepeatPassword"><br>
          <input id="registration-btn" class="submit btn" type="button" name="submit-registration" value="Register" @click="register"><br>
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
      regRepeatPassword: ""
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
    this.$store.dispatch('register', {email: this.regEmail, username: this.regUsername, password: sha256(this.regPassword), returnSecureToken: true})

  } else{
    // Error message here
  }
}
}
}

</script>
