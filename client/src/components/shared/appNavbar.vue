<template>
    <nav v-if="!hider" class=" navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <router-link class="navbar-brand" to="/">SMART EDU</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class=" collapse navbar-collapse" id="navbarColor01">
                <ul class="ms-auto navbar-nav ">
                    <li class="nav-item">
                        <router-link active-class="active" class="nav-link" to="/">Home

                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link active-class="active" class="nav-link" to="/about">About Us</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link active-class="active" class="nav-link" to="/courses">Courses</router-link>
                    </li>

                    <li v-if="currentUser" class="nav-item dropdown">
                        <a  class="nav-link " data-bs-toggle="dropdown" href="#" role="button"
                            aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-user me-2"></i>{{
                                currentUser.full_name
                            }}</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item small" href="#"><i class="fa-regular fa-user me-1"></i>Profile</a>
                            <a class="dropdown-item small" href="#"><i
                                    class="fa-solid fa-laptop-code me-1"></i>Dashboard</a>

                            <div class="dropdown-divider"></div>
                            <button @click="logout" class="dropdown-item small" href="#">
                                <i class="fa-solid fa-right-from-bracket me-1"></i>Logout</button>
                        </div>
                    </li>
                    <li v-if="!currentUser" class="nav-item">
                        <router-link to="/login" class="btn btn-outline-light">Login</router-link>

                    </li>
                </ul>

            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        hider() {
            return this.$route.name === 'Login' || this.$route.name === 'Register'
        },
        ...mapGetters({
            currentUser: "users/getCurrentUser"
        })
    },
    methods: {
        logout() {
            console.log("aloo");
            this.$store.dispatch("users/logout")
        }
    }
}
</script>

<style>

</style>