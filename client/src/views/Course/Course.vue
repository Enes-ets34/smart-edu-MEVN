<template>
  <div>
    <Carousel :carouselContent="carouselContent" />
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
            <div class="card-footer text-center"><h5><i class="fa-solid fa-chalkboard-user me-2"></i>{{ course.teacher.full_name }}</h5></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '../../components/shared/Carousel.vue'
import appAxios from '../../utils/appAxios'

export default {
  components: { Carousel },
  data() {
    return {
      course: {},
      carouselContent: {
      }
    }
  },
  created() {
    console.log('this.params.slug :>> ', this.$route.params.slug);
    appAxios.get(`/courses/${this.$route.params.slug}`)
      .then(res => {
        this.course = res.data.course
        this.course.created_at = new Date(this.course.created_at)
        this.carouselContent = {
          header: this.course.title,
          content: this.course.description,
          img: this.course.img
        }
        console.log('this.course :>> ', this.course);

      })
      .catch(err => console.error(err))
  },
  computed: {
    courseImg() {
      return !this.course?.img ? "https://eticaretsozlugu.kobisi.com/wp-content/uploads/2018/02/code-1839406_1280-825x510.jpg" : this.course?.img
    },
    createdAt() {
      return `${(this.course?.created_at)?.getDate()}/${(this.course?.created_at)?.getMonth() + 1}/${(this.course?.created_at)?.getFullYear()} `
    }
  }

}
</script>

<style>

</style>