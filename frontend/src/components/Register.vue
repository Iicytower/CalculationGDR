<template>
  <div>

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
      nicknameReg: '',
      passwordReg: '',
      }
  },
  methods: {
    async sendRegisterForm(){
      const adress = process.env.BEHOST ?? 'http://localhost:3000';
      console.log("regForm");
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

      } catch (err) {
        console.error(err);
        alert("Something goes wrong. Please try again later.");
      }

      },
  }
}
</script>