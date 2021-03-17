<template>
  <div class="container">


    <div class="mainPiece loginContainer">
      <form id="login">
        <h2>Login</h2>
        <div class="nickname"><label for="login">
          nickname: <input required type="text" placeholder="Enter your nickname" id="loginNickname">
          </label></div>
        <div class="password"><label for="password">
          password: <input required type="password" placeholder="*********" id="loginPassword">
        </label></div>
        <div><input type="button" value="Login!" id="loginForm"></div>
      </form>
    </div>


    <div class="mainPiece registerContainer">
      <form id="register">
        <h2>Register</h2>
        <div class="nickname"><label for="login">
        nickname: <input required type="text" placeholder="Enter your nickname"
            id="registerNickname">
        </label></div>
        <div class="password"><label for="password">
          password: <input required type="password" placeholder="*********" id="registerPassword">
        </label></div>
        <div><input type="button" value="Register!" id="registerForm"></div>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        nickname: '',
        password: '',
      },
    }
  },
}
</script>

<style lang="scss">
@import "./views/scss/variables.scss";

* {
  margin: 0;
  padding: 0;
}

body {
  // margin: auto;
  // padding: auto;
  background-color: $backgroundColor;
  color: $fontColor;
  font-family: 'Open Sans', sans-serif;
  font-size: $mediumFontSize;
  // display: flex;
  // align-items: center;
}

.container {
  display: flex;
  //  margin-left: auto;
  //  margin-right: auto;
  margin: auto;
  margin-top: 25vh;
  padding: 2px;
  align-items: center;
  justify-content: space-around;
  align-content: space-around;
  flex-wrap: wrap;
  // height: 100vh;
}

.mainPiece{
  display: flex;
  justify-content: space-around;
  padding: 10px;
  margin: 10px;
  align-items: center;
}

.form{
  margin: auto;
  padding: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

#response{
  margin: 15px auto;
  color: red;
}

.nickname, .password{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
