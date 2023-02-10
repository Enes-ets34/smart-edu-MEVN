<template>
    <div class="p-3 bg-light w-100 text-primary">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-8 me-auto">
                    <p class="display-4 fw-bold">
                        {{ carouselContent.header }}
                    </p>
                    <p v-html="carouselContent.content" class="fs-4"></p>
                    <div class="col-md-3 d-flex justify-content-between align-items-center">
                        <button class="btn btn-sm btn-warning">Contact Us</button>
                        <router-link to="/about" tag="button" class="btn btn-sm btn-secondary">About Us</router-link>
                    </div>
                </div>
                <div class="col-md-4  d-none d-sm-block d-md-none d-lg-block ">
                    <img :src="carouselImg" alt="" class="img-fluid ">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
    carouselContent: {
        type: Object,
    }
})
const carouselImg = computed(() => {
    return !props.carouselContent.img ? `https://www.codecademy.com/webpack/7f8fd6dd32aa8afc918a5cf6a9fe2933.svg` : props.carouselContent.img
})
</script>

<style scoped>
.img-fluid {
    mix-blend-mode: color-burn
}
</style>