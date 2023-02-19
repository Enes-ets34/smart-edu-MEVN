import appAxios from "../../utils/appAxios";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    courseList: [],
  },
  mutations: {
    setCourseList(state, pCourses) {
      state.courseList = pCourses;
    },
    addCourse(state, pCourse) {
      state.courseList.unshift(pCourse);
    },
  },
  actions: {
    fetchCourses({ commit }, { categories, searchKey }) {
      // Build the URL for the API call based on the selected categories and search key
      let url = "/courses?";
      const IDs = categories
        .filter((c) => c.selected)
        .map((c) => `categories=${c.slug}`)
        .join("&");
      if (categories) {
        url = `${url}&${IDs}`;
      }
      if (searchKey) {
        url = `${url}&search=${searchKey}`;
      }

      console.log("url :>> ", url);

      // Call the API to fetch the courses
      appAxios
        .get(url)
        .then((res) => {
          // If successful, update the state with the fetched courses
          commit("setCourseList", res?.data?.courses);
          console.log("res?.data?.courses :>> ", res?.data?.courses);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addCourse({ commit }, pCourse) {
      // Call the API to add a new course
      appAxios
        .post("/courses", {
          ...pCourse,
          teacher: JSON.parse(localStorage.user)._id,
          role: JSON.parse(localStorage.user).role,
        })
        .then((res) => {
          if (res.status === 201) {
            // If successful, navigate to the courses page and update the state with the added course
            router.push({ name: "Courses" });
            commit("addCourse", res.data.course);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updateCourse({ commit }, pCourse) {
      // Call the API to update an existing course
      appAxios
        .put(`/courses/${pCourse._id}`, {
          ...pCourse,
          role: JSON.parse(localStorage.user).role,
        })
        .then((res) => {
          if (res.status === 204) {
            // If successful, reload the page to show the updated course
            location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  getters: {
    // Get all the courses
    getCourses: (state) => state.courseList,
    // Get latest courses
    getLatestCourses: (state) => state.courseList.slice(0, 3),
    // Get all courses count
    getCoursesCount: (state) => state.courseList.length,
  },
};
