<template>
  <div>
    <MainPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainPage from "@/components/MainPage.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    MainPage
  }
});
</script>
