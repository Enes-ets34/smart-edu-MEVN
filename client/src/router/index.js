import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import { isObject } from "util";

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
        import(/* webpackChunkName: "about" */ "../views/Course/Course.vue"),
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
        import(/* webpackChunkName: "about" */ "../views/Course/Courses.vue"),
      appNavbar,
      appFooter,
    },
  },
  {
    path: "/add-course",
    name: "AddCourse",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () =>
        import(/* webpackChunkName: "about" */ "../views/Course/AddCourse.vue"),
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
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authenticatedPages = ["Dashboard", "Profile", "AddCourse"];
  const roles = ["admin", "teacher"];
  let user = null;


  
  if (localStorage?.user) {
    user = JSON.parse(localStorage?.user);
  }
  if (isObject(user)) {
    store.commit("users/setUser", user);
  }

  const isAuth = store.getters["users/isAuth"];
  if (!isAuth && authenticatedPages.indexOf(to.name) > -1) {
    next({ name: "Login" });
  }
  if (!isAuth && to.name === "AddCourse") {
    next({ name: "Login" });
  }
 
  if ((isAuth && to.name === "Login") || (isAuth && to.name === "Register")) {
    next({ name: "Home" });
  }
  next();
});

export default router;
