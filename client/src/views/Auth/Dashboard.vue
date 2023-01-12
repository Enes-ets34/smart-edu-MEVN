<template>

    <Carousel :carouselContent="carouselContent" />

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 mx-auto p-4 ">
                <div class="my-2 card mb-3 bg-light p-2">
                    <div class="row g-0 align-items-center">
                        <div class="col-md-4 ">
                            <img style="max-height:12rem" src="https://avatars.githubusercontent.com/u/5469995?v=4"
                                class="img-fluid img-thumbnail rounded-pill" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ currentUser.full_name }}</h5>
                                <h6 class="text-muted">{{ currentUser.title }}</h6>
                                <p class="card-text">{{ currentUser.bio }}</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div v-for="course in courses" :key="course._id" class="col-md-6 d-flex align-self-stretch my-2">
                        <CourseItem :course="course">
                            <template #footer>
                                <div class="d-grid gap-2 d-md-flex">
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
            .then(res =>
                this.courses = res.data.courses)
            .catch(err => console.error(err))
    },
    computed: {
        ...mapGetters({
            currentUser: "users/getCurrentUser"
        })
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
                        if (res.status === 204) {
                            this.courses = this.courses.filter(c => c._id !== e._id)
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });

            }
        },
    }
}


</script>