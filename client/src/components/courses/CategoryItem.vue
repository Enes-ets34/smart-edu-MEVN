<template>
    <div @click="selectedCategories()" :key="category._id" :class="{ 'bg-secondary text-light': category.selected }"
        class="border border-1 p-2">
        <i class="fa-solid fa-hashtag me-1"></i>{{ category.title }}
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';


const emit = defineEmits()

const props = defineProps({
    category: {
        type: Object,
        required: true
    }
})
const selectedCategories = () => {
    props.category.selected = !props.category.selected
    emit('selected-categories', props.category)
}

</script>