<template>
  <div>


    <Carousel />

    <div class="row">
      <div class="col-md-6 mx-auto text-center my-5">
        <h1 class="text-dark">Latest Courses</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, provident voluptatem velit aliquam iure
          officia.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 mx-auto d-flex">
        <div class="col-md-6">
          <h3>Nodejs</h3>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia animi aperiam itaque a voluptatem
            doloribus totam in praesentium rerum quod, ad ea ducimus alias dolor quidem nisi recusandae est accusantium
            omnis consectetur! Laboriosam harum temporibus quibusdam magni! Id non hic quis, exercitationem aliquam
            cupiditate omnis pariatur illum explicabo laboriosam quisquam, quidem repellat. Omnis laborum esse inventore
            ipsum quo vero eos! Ea nisi quidem, itaque temporibus incidunt ullam molestiae dolore inventore debitis
            autem totam fugit quisquam.</span>
        </div>
        <div class="ms-auto">
          <img
          style="width:250px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png?20170401104355"
            alt="" class="img-fluid me-auto ">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/home/Carousel.vue'
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    Carousel

  }
}
</script>
