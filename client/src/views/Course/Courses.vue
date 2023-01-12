<template>
  <div>
    <Carousel :carouselContent="carouselContent" />
    <div class="container my-5">
      <div class="col-md-12 mx-auto">
        <div class="row">
          <Categories @select-category="selectCategories($event)" :categories="categories" />
          <div class="col-md-8">
            <div v-if="courseList.length === 0" class="col-md-8 mx-auto alert alert-primary text-center">
              <p class="display-6">there is no course for this category(ies) yet.</p>
            </div>
            <div class="row">
              <div v-for="course in courseList" :key="course._id" class="col-md-5 d-flex align-self-stretch mb-3">
                <Course-item :course="course">
                  <template #footer>
                    <div class="d-flex justify-content-between align-items-center">
                      <small class="d-flex justify-content-start align-items-center">
                        <i class="fa-solid fa-chalkboard-user me-1"></i>{{ course.teacher.full_name }}
                      </small>
                      <small class="d-flex justify-content-start align-items-center">
                        <i class="fa-solid fa-hashtag me-1"></i>{{ course.category.title }}
                      </small>
                    </div>
                  </template>
                </Course-item>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import Carousel from '../../components/shared/Carousel.vue'
import appAlert from '../../components/shared/appAlert.vue'
import Categories from '../../components/courses/Categories.vue'
import CourseItem from '../../components/courses/CourseItem.vue'

export default {
  components: { Carousel, Categories, CourseItem },
  data() {
    return {

      carouselContent: {
        header: "Courses",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo ullam quam placeat? Quod, adipisci autem?",
        img: "https://static-assets.codecademy.com/components/curriculum/path/build-web-apps-with-react/curriculum-card.svg"
      }
    }
  },

  created() {
    this.$store.getters["categories/getSelectedCategories"]
    this.$store.dispatch("courses/fetchCourses")
    this.$store.dispatch("categories/fetchCategories");
  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories",
      courseList: "courses/getCourses"
    })
  },
  methods: {
    selectCategories(e) {
      this.$store.dispatch("courses/fetchCourses", this.categories);


    }
  }
}
</script>

<style>

</style>