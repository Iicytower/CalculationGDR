<template>
  <div>
    <h3>perDay</h3>
    <!-- <button type="button" @click="test">testBtn</button> -->

    <div class="el perDay">
      <div id="works">
        <button type="button" class="addWork" id="addWork" @click="addWork">add work</button>
        <div id="worksList"></div>
      </div>
      <Work v-for="work in sendObj.workPerDay.works" v-bind:key="work.name" />
      <div class="border"></div>
      <div class="formIt">
        <label>
          persons quantity
          <input type="number" name="personsQuantity" value="1" required
        /></label>
      </div>
      <div class="formIt">
        <label>
          total sum of working days
          <input
            type="number"
            name="totalSumOfWorkingDays"
            value="0"
            required
            readonly
        /></label>
      </div>
      <div class="formIt">
        <label>
          money of the day
          <input
            type="number"
            name="moneyOfTheDay"
            step="50"
            value="400"
            required
        /></label>
      </div>
    </div>
  </div>
</template>

<script>
import Work from "./perDay/Work.vue";
export default {
  data() {
    return {
      works: this.sendObj.workPerDay.works,
    };
  },
  props: ['sendObj'],
  methods: {
    addWork(){
      this.sendObj.workPerDay.works.push({
                name: "one",
                activities: [
                    {
                        name: "",
                        personsQuantity: 0,
                        numberOfWorkingDays: 0,
                        moneyOfTheDay: 400,
                        materials: [
                            {
                                name: "",
                                quantity: 0,
                                pricePerItem: 0
                            }
                        ],
                        staffCosts: 0,
                        materialsSumPrice: 0
                    }
                ],
                sumOfWorkingDays: 0
            });
      console.log(this.sendObj);
    },
    test(){
      console.log(this.sendObj);
    },
  },
  components: {
    Work,
  },
};
</script>
