<template>
  <div>
    <div class="dashboardContainer">

      <div class="list">
        <ul>
          <QuotationsList v-bind:el="el" v-for="el in quotationsList.data" v-bind:key="el._id"/>
        </ul>
      </div>

      <div class="court">

      </div>

    </div>
  </div>
</template>

<style lang="scss">

  ul {
    list-style-type: none;
    margin: 0.5vh;
    padding: 5px;
  }

  .dashboardContainer{
    display: flex;
    flex-direction: raw;
    justify-content: space-around;
    align-items: center;
    width: 97%;
    .list{
      width: 20vw;
    }
    .court{
      width: 80vw;
    }
  }
</style>

<script>
  import { fetchQuotationsList } from "../apiRequests/dowAllUserQuotations";
  import QuotationsList from './dashboardCom/QuotationsList.vue';
export default {
  data() {
    return {
      quotationsList: {},
    }
  },
  async created(){
    await this.currentUserQuotationsList();
  },
  methods: {
    async currentUserQuotationsList(){
      try {
        this.quotationsList = await fetchQuotationsList();
      } catch (err) {
        console.error(err);
        alert("Something goes wrong. Please try later.")
      }
    },
  },
  components: {
    QuotationsList,
  }
}
</script>

<style scoped lang="scss">

.dashboardContainer{
  text-align: center;
}

</style>