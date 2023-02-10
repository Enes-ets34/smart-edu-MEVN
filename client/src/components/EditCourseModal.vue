<template>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Course</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="form-group">
                            <div class="mb-3">
                                <label for="title">Course Title</label>
                                <input v-model="editCourse.title" type="text" name="title" id="title"
                                    placeholder="Enter Course Title" class="form-control ">
                            </div>
                            <div class="mb-3">
                                <label for="description">Course Description</label>
                                <textarea v-model="editCourse.description" type="password" name="description"
                                    id="description" placeholder="Enter description" rows="5"
                                    class="form-control"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="thumbnail">Course Image</label>
                                <input v-model="editCourse.img" type="text" name="thumbnail" id="thumbnail"
                                    placeholder="Enter Image URL" class="form-control ">
                            </div>
                            <div class="mb-3">
                                <label for="category">Course Category</label>
                                <select v-model="editCourse.category" class="form-select mb-3" id="category">
                                    <option v-for="category in categories" :key="category._id" :value="category._id">
                                        {{ category.title }}
                                    </option>
                                </select>

                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="$emit('updateCourse', editCourse)" type="button" class="btn btn-primary">Save
                        changes</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const props = defineProps(
    {
        editCourse: {
            type: Object,
        }
    }
)
const categories = computed(() => store.getters["categories/getCategories"])
</script>
<style scoped>

</style>