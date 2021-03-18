<template>
  <div>

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

  </div>
</template>

<script>
export default {

  data() {
    return {
      nicknameLog: '',
      passwordLog: '',
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

  }
}
</script>
