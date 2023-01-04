<template>
  <div>


    <Carousel />

    <div class="row">
      <div class="col-md-6 mx-auto text-center my-5 p-2">
        <h1 class="text-dark">Latest Courses</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, provident voluptatem velit aliquam iure
          officia.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 mx-auto p-4 ">
        <div class="card mb-3 bg-light p-2">
          <div class="row g-0 align-items-center">
            <div class="col-md-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png"
                class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Nodejs</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse recusandae
                  necessitatibus sed vel enim quis obcaecati facere soluta deleniti, excepturi sequi, alias fuga veniam
                  dolores quas delectus aut quam. Commodi, eaque. Aut id laboriosam ea officia dolore explicabo fugit
                  nisi iusto repellat cum distinctio ipsa ullam facere sapiente, sunt repellendus!</p>
                <p class="card-text"><button class="btn btn-secondary">Learn More</button></p>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-3 bg-light p-2">
          <div class="row g-0 align-items-center">
            <div class="col-md-4 order-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png"
                class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 order-0">
              <div class="card-body">
                <h5 class="card-title">AWS</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse recusandae
                  necessitatibus sed vel enim quis obcaecati facere soluta deleniti, excepturi sequi, alias fuga veniam
                  dolores quas delectus aut quam. Commodi, eaque. Aut id laboriosam ea officia dolore explicabo fugit
                  nisi iusto repellat cum distinctio ipsa ullam facere sapiente, sunt repellendus!</p>
                <p class="card-text"><button class="btn btn-secondary">Learn More</button></p>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-3 bg-light p-2">
          <div class="row g-0 align-items-center">
            <div class="col-md-4  ">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/225px-Unofficial_JavaScript_logo_2.svg.png"
                class="img-fluid rounded-start " alt="...">
            </div>
            <div class="col-md-8 ">
              <div class="card-body">
                <h5 class="card-title">Javascript</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse recusandae
                  necessitatibus sed vel enim quis obcaecati facere soluta deleniti, excepturi sequi, alias fuga veniam
                  dolores quas delectus aut quam. Commodi, eaque. Aut id laboriosam ea officia dolore explicabo fugit
                  nisi iusto repellat cum distinctio ipsa ullam facere sapiente, sunt repellendus!</p>
                <p class="card-text"><button class="btn btn-secondary">Learn More</button></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12 bg-dark">
        <div class="col-md-10 mx-auto row row-cols-1 row-cols-md-3 p-4">


          <div class="card mb-3 bg-warning text-light text-center p-2">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <p class="display-2">

                  <i class="fa-solid fa-graduation-cap"></i>
                </p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2>

                    1500 Students
                  </h2>

                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3 bg-warning text-light text-center p-2">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <p class="display-2"><i class="fa-solid fa-laptop-code"></i></p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2>
                    56 Courses
                  </h2>

                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3 bg-warning text-light text-center p-2">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <p class="display-2"><i class=" fa-solid fa-user-graduate"></i></p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2>

                    18 Teachers
                  </h2>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import Carousel from '../components/home/Carousel.vue'
import appAxios from '../utils/appAxios';
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    Carousel
  },


}
</script>
