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
    fetchCourses({ commit }) {
      appAxios
        .get("/courses")
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
          teacher: JSON.stringify(JSON.parse(localStorage.user).full_name),
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
