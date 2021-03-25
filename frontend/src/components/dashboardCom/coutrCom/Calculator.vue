<template>
  <div>
    <h2>Calculator</h2>
    <PerDay v-if='method==="perDay"' />
    <PerMeter v-if='method==="perMeter"' />

  </div>
</template>

<script>
import PerDay from "./PerDay.vue";
import PerMeter from "./PerMeter.vue";

export default {
  data() {
    return {};
  },
  components: {
    PerDay,
    PerMeter,
  },
  props: ['method'],
};
</script>
