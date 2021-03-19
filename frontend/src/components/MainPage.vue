<template>
  <div class="container">

    <LoginItem />

    <RegisterItem />
    
  </div>
</template>

<script>
  import LoginItem from "./Login.vue";
  import RegisterItem from "./Register.vue";
export default {
  components:{
    LoginItem,
    RegisterItem,
  },
}
</script>

<style lang="scss">
@import "../../scss/variables.scss";

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

.nickname, .password{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
