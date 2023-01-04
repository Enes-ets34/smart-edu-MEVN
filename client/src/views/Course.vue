<template>
  <div>
    <Carousel />
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto mt-5">
          <div class="card bg-light">
            <div class="card-header">
              <img :src="courseImg" alt="" class="img-fluid">
            </div>
            <div class="card-body">
              <div class="card-title d-flex justify-content-between align-items-center">
                <span class="text-muted"><i class="fa-solid fa-calendar-days"></i> 12.04.2022</span>
                <button class="btn btn-primary w-25">Enroll</button>
              </div>
              <div class="card-title">
                <h3>{{course.title}}</h3>
              </div>
              <div class="card-text  border-start border-5 border-primary px-3">Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Eveniet aperiam,
                provident illo iusto suscipit aliquam veniam! Quod, cum ad! Ab quo exercitationem quia? Cumque
                inventore deleniti corrupti amet? Asperiores cumque consequuntur nulla libero sunt amet placeat
                molestias omnis soluta suscipit, dicta incidunt non voluptate nemo laboriosam fuga blanditiis quos
                tempora.</div>
            </div>
            <div class="card-footer text-center">Teacher 1</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/home/Carousel.vue'
export default {
  components: { Carousel },
  props: {
    course: {
      type: Object,
      required: true,
    }
  },
  computed: {
    courseImg() {
      return !course.img ? "https://eticaretsozlugu.kobisi.com/wp-content/uploads/2018/02/code-1839406_1280-825x510.jpg" : course.img
    }
  }

}
</script>

<style>

</style>