<template>
  <div>
    <Carousel />
    <div class="container my-5">
      <div class="col-md-12 mx-auto">
        <div class="row">
          <Categories />
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
import Carousel from '../components/home/Carousel.vue'
import appAxios from '../utils/appAxios'
import Categories from './Courses/Categories.vue'
import CourseItem from './Courses/CourseItem.vue'

export default {
  components: { Carousel, Categories, CourseItem },
  data() {
    return {
      courseList: []
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

  }
}
</script>

<style>

</style>