<template>

    <div class="card ">
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
        <div class="card-footer">
            <slot name="footer">

            </slot>
            <!-- <small class="d-flex justify-content-start align-items-center">
                    <i class="fa-solid fa-chalkboard-user me-1"></i>{{ course.teacher.full_name }}

                </small>
                <small class="d-flex justify-content-start align-items-center">
                    <i class="fa-solid fa-hashtag me-1"></i>{{ course.category.title }}
                </small> -->

            <!-- <small>{{ course.category }}</small> -->
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