<template>
  <div>
    <Carousel :carouselContent="carouselContent" />
    <div class="row">
      <div class="col-md-6 mx-auto text-center my-5 p-2">
        <h1 class="text-dark">Latest Courses</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, provident voluptatem velit aliquam iure
          officia.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-10 mx-auto p-4 ">
        <AppLoader v-if="loading" />
        <div v-else v-for="(course, index) in latestCourses" :key="course._id" class=" my-2 card mb-3 bg-light p-2">
          <div class="row  g-0 align-items-center">
            <div :class="{ 'order-1 text-end': index % 2 === 0 }" class="col-md-4  mx-auto">

              <img style="max-height:15rem" :src="course.img" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8  " :class="{ 'order-0 ': index % 2 === 0 }">
              <div class="card-body">
                <h5 class="card-title">{{ course.title }}</h5>
                <p class="card-text">{{ course.description }}</p>
                <p class="card-text"><router-link :to="`/course/${course.slug}`" class="btn btn-secondary">Learn
                    More</router-link></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12 bg-dark">
        <div class="col-md-10 mx-auto row row-cols-1 row-cols-md-3 p-4">


          <div class="card mb-3 bg-warning text-light text-center p-2">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <p class="display-2">

                  <i class="fa-solid fa-graduation-cap"></i>
                </p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2>

                    1500 Students
                  </h2>

                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3 bg-warning text-light text-center p-2">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <p class="display-2"><i class="fa-solid fa-laptop-code"></i></p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2>
                    {{ coursesCount }} Courses
                  </h2>

                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3 bg-warning text-light text-center p-2">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <p class="display-2"><i class=" fa-solid fa-user-graduate"></i></p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2>
                    18 Teachers
                  </h2>
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

import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import AppLoader from '../components/shared/appLoader.vue';
import Carousel from '../components/shared/Carousel.vue'

const store = useStore()

const carouselContent = reactive({
  header: "Smart Edu For You.",
  content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo ullam quam placeat? Quod, adipisci autem?",
  img: "https://www.codecademy.com/webpack/7f8fd6dd32aa8afc918a5cf6a9fe2933.svg"
})



const categories = computed(() => store.getters["categories/getCategories"])
const fetchCategories = () => store.dispatch("categories/fetchCategories");
const fetchCourses = () => store.dispatch("courses/fetchCourses", { categories: categories.value })
fetchCategories()
fetchCourses()

const latestCourses = computed(() => store.getters["courses/getLatestCourses"])
const coursesCount = computed(() => store.getters["courses/getCoursesCount"])
const loading = computed(() => store.getters["loading"])
</script>

