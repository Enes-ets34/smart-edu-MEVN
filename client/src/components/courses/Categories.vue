<template>
    <div class="col-md-3 me-auto mb-4">
        <div class="card">
            <div class="card-header bg-warning text-dark text-center">Categories</div>
            <div class="card-body p-0">
                <div @click="category.isSelect = !category.isSelect" v-for="category in categories"
                    :key="category._id" :class="{ 'bg-secondary text-light': category.isSelect }"
                    class="border border-1 p-2">
                    <i class="fa-solid fa-hashtag me-1"></i>{{ category.title }}
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import appAxios from '../../utils/appAxios';

export default {
    props: {
        categories: {
            type: Object,
            required: true
        }
    }

}
</script>

<style>

</style>