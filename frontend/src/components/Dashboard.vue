<template>
  <div>
    <div class="dashboardContainer">

      <h1>This is a dashboard page</h1>
      <a href="http://localhost:8080/">Home Page Link</a>

      <ul>
        <li  class="listItem" v-for="el in quotationsList.data" v-bind:key="el._id">

          <div class="name"><h3>{{ el.name }}</h3></div>
          <div class="dates">
            <div class="dateItem">last update: <br> {{ getYMD(el.createdAt) }} </div>
            <div class="dateItem">created at: <br> {{ getYMD(el.updatedAt) }} </div>
          </div>
          <div class="delEditBtns">
            <button type="button" class="delete" v-bind:id="el._id">delete</button>
          </div>  
          
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import { fetchQuotationsList } from "../apiRequests/dowAllUserQuotations";
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
        const quotationsList = await fetchQuotationsList()
        console.log('dowAllUserQuotations');
        console.log('dowAllUserQuotations', quotationsList);
        this.quotationsList = quotationsList;


      } catch (err) {
        console.error(error);
        alert("Something goes wrong. Please try later. dash")
      }
    },
    getYMD(date){
      const d = new Date(date);
      return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
    },
  },
}
</script>

<style scoped lang="scss">

.dashboardContainer{
  text-align: center;
}

</style>