<template>

  <div>
    <Carousel :carouselContent="carouselContent" />
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto mt-5">
          <appAlert v-if="showAlert" alertType="primary">
            <template #content>
              <p class="display-6">{{ course.title }} Enrolled Successfully...</p>
            </template>
          </appAlert>
          <div class="card bg-light">
            <div class="card-header text-center">
              <img :src="courseImg" alt="" class="img-fluid ">
            </div>
            <div class="card-body">
              <div class="card-title d-flex justify-content-between align-items-center">
                <span class="text-muted"><i class="fa-solid fa-calendar-days"></i>  {{ createdAt }}</span>
                <button v-if="hasAlreadyEnroll" @click="enrollCourse" class="btn btn-primary w-25">Enroll</button>
                <button v-else class="btn btn-danger w-25">Release</button>
              </div>
              <div class="card-title">
                <h3>{{ course.title }}</h3>
              </div>
              <div class="card-text  border-start border-5 border-primary px-3">{{ course.description }}</div>
            </div>
            <div class="card-footer text-center">
              <h5><i class="fa-solid fa-chalkboard-user me-2"></i>{{ course.teacher?.full_name }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Carousel from '../../components/shared/Carousel.vue'
import appToast from '../../components/shared/appToast.vue'
import appAxios from '../../utils/appAxios'

export default {
  components: { Carousel, appToast },
  data() {
    return {
      course: {},
      carouselContent: {
      },
      showAlert: false
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
    },
    hasAlreadyEnroll() {
      return !this.currentUser?.courses?.includes(this.course)
    },
    ...mapGetters({
      currentUser: "users/getCurrentUser"
    })
  },
  methods: {
    enrollCourse() {
      this.$store.dispatch("courses/enrollCourse", this.course)
    }
  },
  watch: {
    showAlert(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.showAlert = false
        }, 2500);
      }
    }
  }

}
</script>

<style>

</style>