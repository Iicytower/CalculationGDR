<template>
  <div class="container">

    <div class="mainPiece loginContainer">
      <form id="login" >
        <h2>Login</h2>
        <div class="nickname"><label for="login">
          nickname: <input required type="text" placeholder="Enter your nickname" id="loginNickname" v-model="nicknameLog">
          </label></div>
        <div class="password"><label for="password">
          password: <input required type="password" placeholder="*********" id="loginPassword" v-model="passwordLog">
        </label></div>
        <div><input type="submit" value="Login!" id="loginFormBtn" @click.prevent="sendLoginForm()"></div>
      </form>
    </div>


    <div class="mainPiece registerContainer">
      <form id="register">
        <h2>Register</h2>
        <div class="nickname"><label for="login">
        nickname: <input required type="text" placeholder="Enter your nickname" id="registerNickname" v-model="nicknameReg">
        </label></div>
        <div class="password"><label for="password">
          password: <input required type="password" placeholder="*********" id="registerPassword" v-model="passwordReg">
        </label></div>
        <div><input type="submit" value="Register!" id="registerFormBtn" @click.prevent="sendRegisterForm()"></div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      nicknameLog: '',
      passwordLog: '',
      nicknameReg: '',
      passwordReg: '',
      }
  },
  methods: {
    async sendLoginForm(){
      const adress = process.env.BEHOST ?? 'http://localhost:3000';

      try {
        
        const res = await fetch(`${adress}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: this.nicknameLog,
            password: this.passwordLog,
          }),
        });

        switch (res.status) {
          case 200:
            window.location.replace("dashboard");
            break;
          case 422:
            const datav = await res.json();
            alert(`Invalid value in ${datav.errors[0].param}.`);
            break;
          case 401:
            alert("Wrong nickname or password.");
            break;
          case 500:
            const datap = await res.json();
            alert(datap.msg);
            break;
          default:
            alert("Something goes wrong. Please try later.");
            break;
        }

      } catch (error) {
        console.error(error);
        alert("Something goes wrong. Please try again later.");
      }

      },
    async sendRegisterForm(){
      const adress = process.env.BEHOST ?? 'http://localhost:3000';

      try {
        
        const res = await fetch(`${adress}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: this.nicknameReg,
            password: this.passwordReg,
          }),
        });

        switch (res.status) {
          case 201:
            const datat = await res.json();
            alert(datat.msg);
            break;
          case 422:
            const datav = await res.json();
            alert(`Invalid value in ${datav.errors[0].param}.`);
            break;
          case 400:
            const dataf = await res.json();
            alert(dataf.msg);
            break;
          case 500:
            const datap = await res.json();
            ralert(datap.msg);
            break;
          default:
            alert("Something goes wrong. Please try later.");
            break;
        }

      } catch (error) {
        console.error(error);
        alert("Something goes wrong. Please try again later.");
      }

      },
  }
}
</script>

<style lang="scss">
@import "./views/scss/variables.scss";

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: $backgroundColor;
  color: $fontColor;
  font-family: 'Open Sans', sans-serif;
  font-size: $mediumFontSize;
}

.container {
  display: flex;
  margin: auto;
  margin-top: 25vh;
  padding: 2px;
  align-items: center;
  justify-content: space-around;
  align-content: space-around;
  flex-wrap: wrap;
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
