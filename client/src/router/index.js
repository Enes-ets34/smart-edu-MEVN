import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import appFooter from "../components/shared/appFooter.vue";
import appNavbar from "../components/shared/appNavbar.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    components: {
      default: Home,
      appNavbar,
      appFooter,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue"),
      appNavbar,
      appFooter,
    },
  },
  {
    path: "/course/:slug",
    name: "Course",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () =>
        import(/* webpackChunkName: "about" */ "../views/Course.vue"),
      appNavbar,
      appFooter,
    },
  },
  {
    path: "/courses",
    name: "Courses",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () =>
        import(/* webpackChunkName: "about" */ "../views/Courses.vue"),
      appNavbar,
      appFooter,
    },
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
