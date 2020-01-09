<template>
    <div>
      <div class="row user-account">
        <div class="col-sm-6 login">
          <h4>Login</h4>
          <form method="post" class="login-form" id="login-form">
            Username: <input id="loginUsername" type="text" name="loginUsername"> <br>
            Password: <input id="loginPassword" type="password" name="loginPassword"><br>
            <input id="login-btn" class="submit btn" type="button" name="submit-login" value="Log in"><br>
          </form>
          <div><p id="login-error"> </p></div>
        </div>
        <div class="col-sm-6 registration">
          <h4>Registration</h4>
          <form method="post" class="registration-form" id="registration-form">
            Username: <input type="text" name="username"><br>
            First name: <input type="text" name="first_name"><br>
            Last name: <input type="text" name="last_name"><br>
            Email: <input type="email" name="email"><br>
            Password: <input type="password" name="password"><br>
            Repeat Password: <input type="password" name="repeatPassword"><br>
            <input id="registration-btn" class="submit btn" type="button" name="submit-registration" value="Register"><br>
          </form>
          <div><p id="registration-error"> </p></div>
        </div>
      </div>
    </div>
</template>

<script>

</script>
