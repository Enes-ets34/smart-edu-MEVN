<template>
  <div>
    <Carousel :image="`https://www.codecademy.com/webpack/7f8fd6dd32aa8afc918a5cf6a9fe2933.svg`" :content='`Enroll a Course For Free. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
    consectetur, adipisicing elit. Rerum aliquam inventore facere temporibus eligendi.
    Reprehenderit?`' />
    <div class="row">
      <div class="col-md-6 mx-auto text-center my-5 p-2">
        <h1 class="text-dark">Latest Courses</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, provident voluptatem velit aliquam iure
          officia.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-10 mx-auto p-4 ">
        <div v-for="(course, index) in latestCourses" :key="course._id" class="my-2 card mb-3 bg-light p-2">
          <div class="row g-0 align-items-center">
            <div class="col-md-4 mx-auto" :class="{ 'order-1 text-end': index % 2 === 0 }">

              <img style="max-height:15rem" :src="course.img" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8" :class="{ 'order-0 ': index % 2 === 0 }">
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
                    56 Courses
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

<script>
import { mapGetters } from 'vuex';
import Carousel from '../components/home/Carousel.vue'

// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    Carousel
  },
  computed: {
    ...mapGetters({
      latestCourses: "courses/getLatestCourses",
      currentUser: "users/getCurrentUser"
    })
  },
  mounted() {

  }

}
</script>
