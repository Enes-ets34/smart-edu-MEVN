<template>
  <div>
    <Carousel :carouselContent="carouselContent" />
    <div class="container my-5">
      <div class="col-md-12 mx-auto">
        <div class="row">
          <div class="col-md-3 me-auto mb-4">
            <div class="d-flex mb-2"><input v-model="searchKey" type="text" class="form-control" placeholder="Search..."
                @keypress.enter="searchCourse"> <button class="btn btn-primary" @click="searchCourse"><i
                  class="fa-brands fa-searchengin"></i></button>
            </div>
            <Categories @select-category="selectCategories()" :categories="categories" />
          </div>

          <div class="col-md-8">
            <appLoader v-if="loading" />
            <div v-else>
              <div v-if="courseList.length === 0" class="col-md-8 mx-auto alert alert-primary text-center">
                <p class="display-6">there is no course for this category(ies) yet.</p>
              </div>

              <div class="row">

                <div v-for="course in courseList" :key="course._id" class="col-md-5 d-flex align-self-stretch mb-3">

                  <Course-item :course="course">
                    <template #footer>
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="d-flex justify-content-start align-items-center">
                          <i class="fa-solid fa-chalkboard-user me-1"></i>{{ course?.teacher?.full_name }}
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

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';

import Carousel from '../../components/shared/Carousel.vue'
import appAlert from '../../components/shared/appAlert.vue'
import Categories from '../../components/courses/Categories.vue'
import CourseItem from '../../components/courses/CourseItem.vue'


const store = useStore()

const searchKey = ref(null)
const carouselContent = reactive({
  header: "Courses",
  content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo ullam quam placeat? Quod, adipisci autem?",
  img: "https://static-assets.codecademy.com/components/curriculum/path/build-web-apps-with-react/curriculum-card.svg"
})

const categories = computed(() => store.getters["categories/getCategories"])
const courseList = computed(() => store.getters["courses/getCourses"])
const selectedCategories = computed(() => store.getters["categories/getSelectedCategories"])
const loading = computed(() => store.getters["loading"])

store.dispatch("courses/fetchCourses", { categories: categories.value, searchKey: searchKey.value })
store.dispatch("categories/fetchCategories");

const selectCategories = () => {
  store.dispatch("courses/fetchCourses", { categories: selectedCategories.value, searchKey: searchKey.value });
}
const searchCourse = () => {
  store.dispatch("courses/fetchCourses", { categories: selectedCategories.value, searchKey: searchKey.value });
}


</script>

<style>

</style>