<script setup>
import Carousel from '../../components/shared/Carousel.vue';
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import appAxios from '../../utils/appAxios'



const store = useStore()
const router = useRouter()


const course = ref({})
let carouselContent = reactive({})
const showAlert = ref(false);
const enrolling = ref(false)


appAxios.get(`/courses/${router.currentRoute.value.params.slug}`)
  .then(res => {
    course.value = res?.data?.course
    course.value.created_at = new Date(course.value.created_at)
    carouselContent = {
      header: course.value.title,
      content: course.value.description,
      img: course.value.img
    }

  })
  .catch(err => console.error(err))

const enrollCourse = () => {
  enrolling.value = true
  if (!currentUser.value) {
    router.push({ name: "Login" });
  } else {
    appAxios.post(`/courses/enroll`, {
      user_id: currentUser.value._id,
      course_id: course.value._id
    })
      .then(res => {
        if (res.status === 201) {
          localStorage.user = JSON.stringify(res?.data?.user)
          store.commit("users/setUser", res?.data?.user)
          router.push({ name: "Dashboard" })
        }
      })
      .catch(err => console.error(err))
  }

}
const releaseCourse = () => {
  appAxios.post(`/courses/release`, {
    user_id: currentUser.value._id,
    course_id: course.value._id
  })
    .then(res => {
      if (res.status === 200) {
        localStorage.user = JSON.stringify(res?.data?.user)
        router.push({ name: "Dashboard" })
      }
    })
    .catch(err => console.error(err))
}


const currentUser = computed(() => store.getters["users/getCurrentUser"])

const loading = computed(() => store.getters["loading"])
const courseImg = computed(() => {
  return !course.value?.img ? "https://eticaretsozlugu.kobisi.com/wp-content/uploads/2018/02/code-1839406_1280-825x510.jpg" : course?.value?.img
})
const createdAt = computed(() => {
  return `${(course.value?.created_at)?.getDate()}/${(course.value?.created_at)?.getMonth() + 1}/${(course.value?.created_at)?.getFullYear()} `
})
const profile_img = computed(() => {
  return !course.value?.teacher?.profile_img ? "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png" : course?.value.teacher?.profile_img
})
const hasEnrolled = computed(() => {
  return Boolean(currentUser.value?.courses.find(c => c === course.value?._id))
})
console.log('course.value :>> ', course.target);
</script>

<template>
  <div>
    <Carousel :carouselContent="carouselContent" />
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto mt-5">
          <appLoader class="mt-5" v-if="loading" />
          <div v-else>
            <div class="card bg-light">
              <div class="card-header text-center">
                <img :src="courseImg" alt="" class="img-fluid ">
              </div>
              <div class="card-body">
                <div class="card-title d-flex justify-content-between align-items-center">
                  <span class="text-muted"><i class="fa-solid fa-calendar-days"></i>  {{ createdAt }}</span>
                  <button v-if="hasEnrolled" @click="releaseCourse" class="btn btn-danger w-25">Release</button>
                  <button :disabled="enrolling" v-if="!hasEnrolled" @click="enrollCourse" class="btn btn-primary w-25">
                    <span v-if="!enrolling">Enroll</span>
                    <span v-else>Enrolling...</span>
                  </button>
                </div>
                <div class="card-title">
                  <h3>{{ course.title }} </h3>
                </div>
                <div class="card-text  border-start border-5 border-primary px-3">{{ course.description }}</div>
              </div>
              <div class="card-footer text-center">
                <h5><i class="fa-solid fa-chalkboard-user me-2"></i>{{ course.teacher?.full_name }}</h5>
              </div>
            </div>
            <div class="my-2 card mb-3 bg-light p-2">
              <div class="row g-0 align-items-center">
                <div class="col-md-4 ">
                  <img style="max-height:12rem" :src="profile_img" class="img-fluid img-thumbnail rounded-pill"
                    alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{{ course?.teacher?.full_name }}</h5>
                    <h6 class="text-muted">{{ course?.teacher?.title }}</h6>
                    <p class="card-text">{{ course?.teacher?.bio }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style>

</style>
