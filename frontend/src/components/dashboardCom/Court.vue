<template>
  <div class="court">
    <div class="calculator">
      <Calculator v-bind:method="method" />
    </div>

    <div class="sumarize">
      <Sumarize @methodChenged="setMethodValue" />
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
    return {
      method: ""
    };
  },
  methods: {
    setMethodValue(value) {
      this.method = value;
    }
  },
  components: {
    Sumarize,
    Calculator
  }
};
</script>
