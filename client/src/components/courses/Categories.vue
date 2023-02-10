<template>

    <div class="card">
        <div class="card-header bg-warning text-dark text-center">Categories</div>
        <div class="card-body p-0">
            <CategoryItem v-for="category in categories" :key="category._id" :category="category"
                @selected-categories="selectedCategories" />
        </div>
    </div>

</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import CategoryItem from './CategoryItem.vue';
const emit = defineEmits()
const props = defineProps({
    categories: {
        type: Array,
        required: true
    }
})

const selectedCategories = () => {
    emit("select-category", props.categories);
}


</script>

<style>

</style>