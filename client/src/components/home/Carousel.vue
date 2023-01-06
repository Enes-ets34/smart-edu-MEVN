<template>
    <div class="p-3 bg-light w-100 text-primary">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-8 me-auto">
                    <p class="display-4 fw-bold">
                       {{header}}
                    </p>
                    <p class="fs-4">{{ content }}
                    </p>
                    <div class="col-md-3 d-flex justify-content-between align-items-center">
                        <button class="btn btn-sm btn-warning">Contact Us</button>
                        <router-link to="/about" tag="button" class="btn btn-sm btn-secondary">About Us</router-link>
                    </div>
                </div>
                <div class="col-md-4  d-none d-sm-block d-md-none d-lg-block ">
                    <img :src="image" alt="" class="img-fluid ">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        header: {
            type: String,
            default: `Smart Edu For You`
        }
    }

}
</script>

<style scoped>
.img-fluid {
    mix-blend-mode: color-burn
}
</style>