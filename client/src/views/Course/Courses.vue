<template>
  <div>
    <Carousel :carouselContent="carouselContent" />
    <div class="container my-5">
      <div class="col-md-12 mx-auto">
        <div class="row">
          <Categories :categories="categories" />
          <div class="col-md-8">
            <div class="row">
              <Course-item v-for="course in courseList" :key="course._id" :course="course" />
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import appAxios from '../../utils/appAxios'
import { mapGetters } from 'vuex'

import Carousel from '../../components/shared/Carousel.vue'
import Categories from '../../components/courses/Categories.vue'
import CourseItem from '../../components/courses/CourseItem.vue'

export default {
  components: { Carousel, Categories, CourseItem },
  data() {
    return {
      courseList: [],
      carouselContent: {
        header: "Courses",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo ullam quam placeat? Quod, adipisci autem?",
        img: "https://static-assets.codecademy.com/components/curriculum/path/build-web-apps-with-react/curriculum-card.svg"
      }
    }
  },

  created() {
    appAxios
      .get("/courses")
      .then((res) => {
        this.courseList = res.data.courses
        console.log("res >> ", res);
      })
      .catch((err) => {
        console.error(err);
      });

  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories"
    })
  },
}
</script>

<style>

</style>