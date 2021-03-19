<template>
  <div>
    <div class="dashboardContainer">

      <h1>This is a dashboard page</h1>
      <a href="http://localhost:8080/">Home Page Link</a>

    </div>
  </div>
</template>

<script>
  import { fetchQuotationsList } from "../apiRequests/dowAllUserQuotations";
export default {
  data() {
    return {

    }
  },
  async created(){
    await this.currentUserQuotationsList();
  },
  methods: {
    async currentUserQuotationsList(){
      try {

        console.log('dowAllUserQuotations');
        console.log(await fetchQuotationsList());
      } catch (err) {
        console.error(error);
        alert("Something goes wrong. Please try later.")
      }
    },
  },
}
</script>

<style scoped lang="scss">

.dashboardContainer{
  text-align: center;
}

</style>