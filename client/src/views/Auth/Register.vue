<template>
    <div class="col-md-5 p-2 mt-5 mx-auto">
        <div class="card">
            <div class="card-header text-center">
                <h3>Register</h3>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <div class="mb-3">
                        <label for="full_name">Full Name</label>
                        <input v-model="userData.full_name" type="text" name="full_name" id="full_name"
                            placeholder="Enter Your Name..." class="form-control ">
                    </div>
                    <div class="mb-3">
                        <label for="email">Email</label>
                        <input v-model="userData.email" type="text" name="email" id="email"
                            placeholder="Enter Your Email" class="form-control ">
                    </div>
                    <div class="mb-3">
                        <label for="password">Password</label>
                        <input v-model="userData.password" type="password" name="password" id="password"
                            placeholder="*****" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="category">Category</label>
                        <!-- <select v-model="userData.category" class="form-select" name="category" id="category"
                            aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select> -->
                    </div>
                </div>
                <div class="d-grid gap-2 mt-3">
                    <button @click="register" class="btn btn-primary">
                        Register
                    </button>
                </div>
            </div>
            <div class="card-footer text-center">
                <router-link to="/login" class="text-secondary">Have You Account? Click for
                    login.</router-link>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            userData: {}
        }
    },
    methods: {
        register() {
            this.$store.dispatch("users/register", this.userData)
        }
    }

}
</script>

<style>

</style>