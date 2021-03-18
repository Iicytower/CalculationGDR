<template>
  <div>

    <h1>Quotation GDR app</h1>

    <MainPage />

  </div>
</template>

<script lang="ts">
import MainPage from './components/MainPage.vue'
export default {
  components: {
    MainPage,
  }
}
</script>

<style lang="scss">
@import "../scss/variables.scss";

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



h1{
  margin-top: 10px;
  text-align: center;
}
</style>