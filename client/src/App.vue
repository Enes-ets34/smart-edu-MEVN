<template>
  <div id="nav">
    <appNavbar name="appNavbar" />
    <div id="modalContent"></div>
    <router-view />
    <appFooter name="appFooter" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';



export default {
  data() {
    return {

    };
  },
  created() {
    this.$store.dispatch("courses/fetchCourses", { categories: this.categories })
    this.$store.dispatch("categories/fetchCategories");

  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories"
    })
  }

}
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
