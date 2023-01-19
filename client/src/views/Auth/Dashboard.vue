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
            <!-- <div v-if="!courses.length === 0" class="col-md-8 mx-auto">
                <div class="alert alert-primary text-center">
                    There is no course ):
                </div>
            </div> -->
        </div>
        <Teleport to="#modalContent">
            <EditCourseModal @updateCourse="updateCourse" :editCourse="editCourse" />
        </Teleport>
    </div>


</template>
<script>

import { mapGetters } from 'vuex';
import CourseItem from '../../components/courses/CourseItem.vue';
import Carousel from '../../components/shared/Carousel.vue';
import EditCourseModal from '../../components/EditCourseModal.vue';
import appAxios from '../../utils/appAxios';
export default {
    components: { Carousel, CourseItem, EditCourseModal },
    data() {
        return {
            carouselContent: {
                header: "Smart Edu For You.",
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo ullam quam placeat? Quod, adipisci autem?",
                img: "https://www.codecademy.com/webpack/7f8fd6dd32aa8afc918a5cf6a9fe2933.svg"
            },
            courses: [],
            editCourse: {}
        }
    },
    created() {
        console.log('this.currentUser :>> ', this.currentUser);
        appAxios.get(`users/dashboard/${this.currentUser._id}`)
            .then(res => {
                if (this.currentUser.role === 'student') {
                    this.courses = res?.data?.user?.courses
                } else {
                    this.courses = res?.data?.courses
                }
            })
            .catch(err => console.error(err))
    },
    computed: {
        ...mapGetters({
            currentUser: "users/getCurrentUser"
        }),

    },
    methods: {
        updateCourse(e) {
            this.$store.dispatch("courses/updateCourse", e)
        },
        deleteCourse(e) {
            if (confirm("ARE YOU SURE?")) {
                appAxios
                    .delete(`/courses/${e._id}`)
                    .then((res) => {
                        if (res?.status === 204) {
                            this.courses = this.courses.filter(c => c._id !== e._id)
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });

            }
        },
        releaseCourse(course) {
            appAxios.post(`/courses/release`, {
                user_id: this.currentUser._id,
                course_id: course._id
            })
                .then(res => {
                    if (res.status === 200) {
                        localStorage.user = JSON.stringify(res?.data?.user)
                        this.courses = this.courses.filter(c => c._id !== course._id)
                    }
                })
                .catch(err => console.error(err))
        }
    }
}


</script>