<template>
    <div class="col-md-5 d-flex align-self-stretch mb-3">
        <div  class="card ">
            <div class="card-header text-center">
                <img :src="courseImg" alt="" class="img-fluid">
            </div>
            <div class="card-body">
                <div class="card-title">
                    <router-link class="text-decoration-none" tag="h3" :to="`/course/${course.slug}`">
                        <h3>{{ course.title }}</h3>
                    </router-link>
                </div>
                <div class="card-text">{{ course.description }}</div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="d-flex justify-content-start align-items-center">
                    <i class="fa-solid fa-chalkboard-user me-1"></i>{{ course.teacher }}
                </small>
                <small class="d-flex justify-content-start align-items-center">
                    <i class="fa-solid fa-hashtag me-1"></i>Javascript
                </small>

                <!-- <small>{{ course.category }}</small> -->
            </div>
        </div>
    </div>


</template>

<script>


export default {
    props: {
        course: {
            type: Object,
            required: true,
        }
    },
    computed: {
        courseImg() {
            return !this.course.img ? "https://eticaretsozlugu.kobisi.com/wp-content/uploads/2018/02/code-1839406_1280-825x510.jpg" : this.course.img
        }
    }
}
</script>

<style>

</style>