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
                        <input type="text" name="email" id="email" placeholder="Enter Your Email" class="form-control ">
                    </div>
                    <div class="mb-3">
                        <label for="password">Password</label>
                        <input type="text" name="password" id="password" placeholder="*****" class="form-control">
                    </div>
                </div>
                <div class="d-grid gap-2 mt-3">
                    <button class="btn btn-primary">
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

<script>
export default {

}
</script>

<style>

</style>