<template>

    <div class="card">
        <div class="card-header bg-warning text-dark text-center">Categories</div>
        <div class="card-body p-0">
            <CategoryItem v-for="category in categories" :key="category._id" :category="category"
                @selected-categories="selectedCategories" />
        </div>
    </div>

</template>

<script>
import CategoryItem from './CategoryItem.vue';



export default {
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    methods: {
        selectedCategories(e) {
            this.$emit("select-category", this.categories);
        }
    },
    components: { CategoryItem }
}
</script>

<style>

</style>