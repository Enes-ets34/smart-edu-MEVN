<template>
  <appNavbar name="appNavbar" />

  <div id="modalContent"></div>
  <router-view />

  <appFooter name="appFooter" />
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore()


store.dispatch["categories/fetchCategories"];
const categories = computed(() => store.getters["categories/getCategories"])
store.dispatch["courses/fetchCourses", { categories: categories }]

</script>
<style>
.card {
  box-shadow: rgba(89, 49, 150, 0.2) -5px 5px, rgba(89, 49, 150, 0.1) -10px 10px, rgba(89, 49, 150, 0.05) -15px 15px;
}

.card:hover {
  box-shadow: rgba(62, 0, 156, 0.3) -5px 5px, rgba(62, 0, 156, 0.2) -10px 10px, rgba(62, 0, 156, 0.1) -15px 15px;
}

html {
  scroll-behavior: smooth;
}
</style>
