<template>
    <div @click="selectedCategories()" :key="category._id"
        :class="{ 'bg-secondary text-light': category.selected }" class="border border-1 p-2">
        <i class="fa-solid fa-hashtag me-1"></i>{{ category.title }}
    </div>
</template>
<script>
export default {
    props: {
        category: {
            type: Object,
            required: true
        }
    },
    methods: {
        selectedCategories() {
            this.category.selected = !this.category.selected
             this.$emit('selected-categories', this.category)
        }
    }

}
</script>