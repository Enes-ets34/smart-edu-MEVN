import appAxios from "../../utils/appAxios";

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
  },
  modules: {},
  getters: {
    getCourses: (state) => state.courseList,
    getLatestCourses: (state) => state.courseList.slice(0,3),
  },
};
