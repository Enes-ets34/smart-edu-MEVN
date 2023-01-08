<template>
    <Carousel :carouselContent="carouselContent" />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card">
                    <div class="card-header text-center">
                        <h3>Add Course</h3>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <div class="mb-3">
                                <label for="title">Course Title</label>
                                <input v-model="userData.title" type="text" name="title" id="title"
                                    placeholder="Enter Course Title" class="form-control ">
                            </div>
                            <div class="mb-3">
                                <label for="description">Course Description</label>
                                <textarea v-model="userData.description" type="password" name="description"
                                    id="description" placeholder="Enter description" rows="5"
                                    class="form-control"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="thumbnail">Course Image</label>
                                <input v-model="userData.img" type="text" name="thumbnail" id="thumbnail"
                                    placeholder="Enter Image URL" class="form-control ">
                            </div>
                            <div class="mb-3">
                                <label for="category">Course Category</label>
                                <select v-model="userData.category" class="form-select mb-3" id="category">

                                    <option v-for="category in categories" :key="category._id" :value="category._id">{{
                                        category.title
                                    }}
                                    </option>
                                </select>

                            </div>
                        </div>

                    </div>
                    <div class="card-footer text-center">
                        <div class="d-grid">
                            <button @click="addCourse" class="btn btn-primary">
                                Add New Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>

import { mapGetters } from 'vuex';
import Carousel from '../../components/shared/Carousel.vue';

export default {
    name: 'AddCourse',
    components: {
        Carousel
    },
    data() {
        return {
            carouselContent: {
                header: "Add New Course",
                content: `<i class='text-muted'>"Think different"</i>`,
                img: "https://www.codecademy.com/_portal/_next/static/images/ReinforcementIllustration.45cf23df705823717193c4654a61033c.svg"
            },
            userData: {}
        }
    },
    methods: {
        addCourse() {
            console.log('this.userData :>> ', this.userData);

            this.$store.dispatch("courses/addCourse", this.userData)
        }
    },
    computed: {
        ...mapGetters({
            categories: "categories/getCategories"
        })

    }
}


</script>