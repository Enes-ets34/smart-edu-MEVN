<template>
    <Carousel :carouselContent="carouselContent" />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 mx-auto p-4 ">
                <div class="mb-5 card bg-secondary text-light text-center">
                    <p v-if="currentUser?.role === 'student'" class="display-6">{{ currentUser.full_name }} Enrolled
                        Courses</p>
                    <p v-else class="display-6">{{ currentUser.full_name }} Uploaded Courses</p>
                </div>
                <div class="row">
                    <div v-for="course in courses" :key="course._id" class="col-md-6 d-flex align-self-stretch my-2">
                        <CourseItem :course="course">
                            <template #footer>
                                <div v-if="currentUser.role === 'student'" class="d-grid gap-2 ">
                                    <button @click="releaseCourse(course)" class="btn btn-danger">
                                        Release
                                    </button>
                                </div>
                                <div v-else class="d-grid gap-2 d-md-flex">
                                    <button data-bs-target="#exampleModal" data-bs-toggle="modal"
                                        @click="editCourse = { ...course }"
                                        class="btn btn-warning col-md-6">Edit</button>
                                    <button @click='deleteCourse(course)'
                                        class="btn btn-danger col-md-6">Delete</button>
                                </div>
                            </template>
                        </CourseItem>
                    </div>
                </div>
            </div>
        </div>
        <Teleport to="#modalContent">
            <EditCourseModal @updateCourse="updateCourse" :editCourse="editCourse" />
        </Teleport>
    </div>


</template>
<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import CourseItem from '../../components/courses/CourseItem.vue';
import Carousel from '../../components/shared/Carousel.vue';
import EditCourseModal from '../../components/EditCourseModal.vue';
import appAxios from '../../utils/appAxios';

const store = useStore()
const carouselContent = {
    header: "Smart Edu For You.",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo ullam quam placeat? Quod, adipisci autem?",
    img: "https://www.codecademy.com/webpack/7f8fd6dd32aa8afc918a5cf6a9fe2933.svg"
}

const courses = ref([])
const editCourse = ref({})
console.log('editCourse :>> ', editCourse.value);

const currentUser = computed(() => store.getters["users/getCurrentUser"])
console.log('this.currentUser :>> ', currentUser.value);
appAxios.get(`users/dashboard/${currentUser.value._id}`)
    .then(res => {
        if (currentUser.value.role === 'student') {
            courses.value = res?.data?.user?.courses
        } else {
            courses.value = res?.data?.courses
        }
    })
    .catch(err => console.error(err))


const updateCourse = (e) => {
    store.dispatch("courses/updateCourse", e)
}
const deleteCourse = (e) => {
    if (confirm("ARE YOU SURE?")) {
        appAxios
            .delete(`/courses/${e._id}`)
            .then((res) => {
                if (res?.status === 204) {
                    courses.value = courses.value.filter(c => c._id !== e._id)
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
const releaseCourse = (course) => {
    appAxios.post(`/courses/release`, {
        user_id: currentUser.value._id,
        course_id: course._id
    })
        .then(res => {
            if (res.status === 200) {
                localStorage.user = JSON.stringify(res?.data?.user)
                courses.value = courses.value.filter(c => c._id !== course._id)
            }
        })
        .catch(err => console.error(err))
}


</script>