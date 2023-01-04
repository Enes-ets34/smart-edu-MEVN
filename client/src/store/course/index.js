import { createStore } from "vuex";
import appAxios from "../../utils/appAxios";

export default createStore({
  namespaced: true,
  state: {
    courseList: [],
  },
  mutations: {
    setCourseList({ state }, pCourses) {
      state.courseList = pCourses;
    },
  },
  actions: {
    fetchCourses({ commit }) {
      appAxios
        .get("/courses")
        .then((res) => {
          commit("setCourseList", res.data);
          console.log("res >> ", res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  modules: {},
  getters: {
    getCourses: (state) => state.courseList,
  },
});
