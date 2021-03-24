<template>
  <div class="court">
    <div class="calculator">
      <Calculator />
    </div>

    <div class="sumarize">
      <Sumarize />
    </div>
  </div>
</template>

<style lang="scss">
.calculator {
  width: 70%;
}

.sumarize {
  width: 30%;
}
</style>

<script>
import Sumarize from "./coutrCom/Sumarize.vue";
import Calculator from "./coutrCom/Calculator.vue";
export default {
  data() {
    return {};
  },
  components: {
    Sumarize,
    Calculator
  }
};
</script>
