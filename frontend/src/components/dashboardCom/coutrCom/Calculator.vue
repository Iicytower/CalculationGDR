<template>
  <div>
    <h2>Calculator</h2>
    <PerDay v-if="method === 'perDay'" v-bind:sendObj="sendObj" />
    <PerMeter v-if="method === 'perMeter'" v-bind:sendObj="sendObj" />
  </div>
</template>

<script>
import PerDay from "./PerDay.vue";
import PerMeter from "./PerMeter.vue";

export default {
  data() {
    return {
      sendObj: {
        name: '',
        useMethod: '',
        workPerDay: {
          works: [],
          personsQuantity: 0,
          totalSumOfWorkingDays: 0,
        },
        workPerMeter: {
          materials: [],
          difficults: [],
          numbersOfMeters: 0,
          pricePerMeter: 0,
        },
        totalMaterialsSumPrice: 0,
        totalWorkPrice: 0,
        totalPriceNetto: 0,
        totalPriceBrutto: 0,
      },
    };
  },
  components: {
    PerDay,
    PerMeter
  },
  props: ["method"]
};
</script>
