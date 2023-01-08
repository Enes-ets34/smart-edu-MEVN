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
  },
  actions: {
    fetchCourses({ commit }, categories ) {
      let url = "/courses?";

      if (categories) {

        const IDs = categories
          .filter((c) => c.selected)
          .map((c) => `categories=${c.slug}`)
          .join("&");

        url = `${url}&${IDs}`;
      }
      console.log("url :>> ", url);

      appAxios
        .get(url)
        .then((res) => {
          commit("setCourseList", res.data.courses);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addCourse({}, pCourse) {
      appAxios
        .post("/courses", {
          ...pCourse,
          teacher: JSON.parse(localStorage.user).full_name,
          role: JSON.parse(localStorage.user).role,
        })
        .then((res) => {
          if (res.status === 201) {
            router.push({ name: "Courses" });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  modules: {},
  getters: {
    getCourses: (state) => state.courseList,
    getLatestCourses: (state) => state.courseList.slice(0, 3),
  },
};
