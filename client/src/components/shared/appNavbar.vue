<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class=" navbar-brand" href="#">SMART EDU</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class=" collapse navbar-collapse" id="navbarColor01">
                <ul class="ms-auto navbar-nav ">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Home
                            
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Course</a>
                    </li>
                  
                    <li class="nav-item dropdown">
                        <a class="nav-link " data-bs-toggle="dropdown" href="#" role="button"
                            aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-user mx-2"></i>Enes Taha Sarı</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item small" href="#"><i class="fa-regular fa-user me-1"></i>Profile</a>
                            <a class="dropdown-item small" href="#"><i class="fa-solid fa-laptop-code me-1"></i>Enrolled Courses</a>
                            
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item small" href="#"><i class="fa-solid fa-right-from-bracket me-1"></i>Logout</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-outline-light">Login</button>
                    </li>
                </ul>
            
            </div>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>