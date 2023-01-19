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
<<<<<<< HEAD
                <button v-if="hasAlreadyEnroll" @click="enrollCourse" class="btn btn-primary w-25">Enroll</button>
                <button v-else class="btn btn-danger w-25">Release</button>
=======
                <button v-if="hasEnrolled" @click="releaseCourse" class="btn btn-danger w-25">Release</button>
                <button v-else @click="enrollCourse" class="btn btn-primary w-25">Enroll</button>
>>>>>>> dev-enes
              </div>
              <div class="card-title">
                <h3>{{ course.title }} </h3>
              </div>
              <div class="card-text  border-start border-5 border-primary px-3">{{ course.description }}</div>
            </div>
            <div class="card-footer text-center">
              <h5><i class="fa-solid fa-chalkboard-user me-2"></i>{{ course.teacher?.full_name }}</h5>
            </div>
<<<<<<< HEAD
=======
          </div>
          <div class="my-2 card mb-3 bg-light p-2">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 ">
                <img style="max-height:12rem" :src="profile_img" class="img-fluid img-thumbnail rounded-pill" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ course?.teacher?.full_name }}</h5>
                  <h6 class="text-muted">{{ course?.teacher?.title }}</h6>
                  <p class="card-text">{{ course?.teacher?.bio }}</p>
                </div>
              </div>
            </div>
>>>>>>> dev-enes
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

    appAxios.get(`/courses/${this.$route.params.slug}`)
      .then(res => {
        this.course = res?.data?.course
        this.course.created_at = new Date(this.course.created_at)
        this.carouselContent = {
          header: this.course.title,
          content: this.course.description,
          img: this.course.img
        }

      })
      .catch(err => console.error(err))
  },
  methods: {
    enrollCourse() {
      appAxios.post(`/courses/enroll`, {
        user_id: this.currentUser._id,
        course_id: this.course._id
      })
        .then(res => {
          if (res.status === 201) {
            localStorage.user = JSON.stringify(res?.data?.user)
            this.$store.commit("users/setUser", res?.data?.user)
            this.$router.push({ name: "Dashboard" })
          }
        })
        .catch(err => console.error(err))
    },
    releaseCourse() {
      appAxios.post(`/courses/release`, {
        user_id: this.currentUser._id,
        course_id: this.course._id
      })
        .then(res => {
          if (res.status === 200) {
            localStorage.user = JSON.stringify(res?.data?.user)
            this.$router.push({ name: "Dashboard" })
          }
        })
        .catch(err => console.error(err))
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "users/getCurrentUser"
    }),
    courseImg() {
      return !this.course?.img ? "https://eticaretsozlugu.kobisi.com/wp-content/uploads/2018/02/code-1839406_1280-825x510.jpg" : this.course?.img
    },
    createdAt() {
      return `${(this.course?.created_at)?.getDate()}/${(this.course?.created_at)?.getMonth() + 1}/${(this.course?.created_at)?.getFullYear()} `
    },
<<<<<<< HEAD
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
=======
    profile_img() {
      return !this.course?.teacher?.profile_img ? "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png" : this.course?.teacher?.profile_img
    },
    hasEnrolled() {
      return Boolean(this.currentUser.courses.find(c => c === this.course._id))
    },

>>>>>>> dev-enes
  }

}
</script>

<style>

</style>