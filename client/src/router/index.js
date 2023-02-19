import { createRouter, createWebHashHistory } from "vue-router";
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

    components: {
      default: () =>
        import(/* webpackChunkName: "about" */ "../views/Course/AddCourse.vue"),
    },
  },
  {
    path: "/login",
    name: "Login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth/Register.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // Define an array of pages that require authentication to access
  const authenticatedPages = ["Dashboard", "Profile", "AddCourse"];
  // Define an array of user roles that are allowed to access certain pages
  const roles = ["admin", "teacher"];
  // Initialize user to null
  let user = null;
  // If the user is stored in localStorage, set the user variable to the stored value
  if (localStorage?.user) {
    user = JSON.parse(localStorage?.user);
  }
  // If the user object is valid, commit it to the store
  if (isObject(user)) {
    store.commit("users/setUser", user);
  }
  // Check if the user is authenticated
  const isAuth = store.getters["users/isAuth"];
  // If the user is not authenticated and they are trying to access an authenticated page, redirect them to the login page
  if (!isAuth && authenticatedPages.indexOf(to.name) > -1) {
    next({ name: "Login" });
  }
  // If the user is not authenticated and they are trying to access the AddCourse page, redirect them to the login page
  if (!isAuth && to.name === "AddCourse") {
    next({ name: "Login" });
  }
  // If the user is authenticated and they are trying to access the Login or Register page, redirect them to the Home page
  if ((isAuth && to.name === "Login") || (isAuth && to.name === "Register")) {
    next({ name: "Home" });
  }
  // If the user is authenticated and they are trying to access any other page, allow them to proceed
  next();
});

export default router;
