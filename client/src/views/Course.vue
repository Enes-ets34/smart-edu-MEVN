<template>
  <div>
    <Carousel :header="course.title" :content="course.description"
      :image="!course.img ? `https://d9hhrg4mnvzow.cloudfront.net/join.codecademy.com/learn/paths/front-end-engineer-career-path-b/f1011174-full-stack-icon_107808y000000000000028.png` : course.img" />
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto mt-5">
          <div class="card bg-light">
            <div class="card-header text-center">
              <img :src="courseImg" alt="" class="img-fluid ">
            </div>
            <div class="card-body">
              <div class="card-title d-flex justify-content-between align-items-center">
                <span class="text-muted"><i class="fa-solid fa-calendar-days"></i>  {{ createdAt }}</span>
                <button class="btn btn-primary w-25">Enroll</button>
              </div>
              <div class="card-title">
                <h3>{{ course.title }}</h3>
              </div>
              <div class="card-text  border-start border-5 border-primary px-3">{{ course.description }}</div>
            </div>
            <div class="card-footer text-center">{{ course.teacher }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/home/Carousel.vue'
import appAxios from '../utils/appAxios'

export default {
  components: { Carousel },
  data() {
    return {
      course: null
    }
  },
  created() {
    console.log('this.params.slug :>> ', this.$route.params.slug);
    appAxios.get(`/courses/${this.$route.params.slug}`)
      .then(res => {
        this.course = res.data.course
        this.course.created_at = new Date(this.course.created_at)
        console.log('this.course :>> ', this.course);

      })
      .catch(err => console.error(err))
  },
  computed: {
    courseImg() {
      return !this.course.img ? "https://eticaretsozlugu.kobisi.com/wp-content/uploads/2018/02/code-1839406_1280-825x510.jpg" : this.course.img
    },
    createdAt() {
      return `${(this.course.created_at).getDate()}/${(this.course.created_at).getMonth() + 1}/${(this.course.created_at).getFullYear()} `
    }
  }

}
</script>

<style>

</style>