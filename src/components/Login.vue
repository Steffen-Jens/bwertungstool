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
import axios from "axios"
export default{

  data() {
    return{
      loginEmail: "",
      loginPassword: "",
      regEmail: "",
      regPassword: "",
      regRepeatPassword: ""
    }
  },
  methods: {
    login(){
      const newUserData = {
        email: this.loginEmail,
        password: this.loginPassword,
        returnSecureToken: true
      }
      axios.post("/accounts:signInWithPassword?key=AIzaSyA6Ycy0RhubkRh4Sjf2Hi76ZtwFBMMPkHo", newUserData)
      .then(res =>{
        /* eslint-disable no-console */
        console.log(res)
        /* eslint-enable no-console */
      }, error => {
        /* eslint-disable no-console */
        console.log(error)
        /* eslint-enable no-console */
      });


    },
    register(){

      if(this.regPassword == this.regRepeatPassword){
        const newUserData = {
          email: this.regEmail,
          password: this.regPassword,
          returnSecureToken: true
        }
        axios.post("/accounts:signUp?key=AIzaSyA6Ycy0RhubkRh4Sjf2Hi76ZtwFBMMPkHo", newUserData)
        .then(res =>
          /* eslint-disable no-console */
          console.log(res)
          /* eslint-enable no-console */
        )
        .catch( error =>
          /* eslint-disable no-console */
          console.log(error)
          /* eslint-enable no-console */
        );
      } else{
            // Error message here
          }
    }
  }
}

</script>
