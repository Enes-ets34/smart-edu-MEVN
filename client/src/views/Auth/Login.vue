<template>
    <div class="col-md-5 p-2 mt-5 mx-auto">
        <div class="card">
            <div class="card-header text-center">
                <h3>Login</h3>
            </div>
            <div class="card-body">
                <div class="form-group">
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

                </div>
                <div class="d-grid gap-2 mt-3">
                    <button :disabled="!isValidate" @click="login" class="btn btn-primary">
                        Login
                    </button>
                </div>
            </div>
            <div class="card-footer text-center">
                <router-link to="/register" class="text-secondary">Have You any Account? Click for
                    register.</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore()

const userData = reactive({})

const login = () => {
    store.dispatch("users/login", userData)
}


const isValidate = computed(() => {
    return (userData?.password?.length && userData?.password?.length > 0) && (userData?.email?.length && userData?.email?.length > 0)
})


</script>

<style>

</style>