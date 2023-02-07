import { createStore } from "vuex";
import courses from "./courses";
import users from "./users";
import categories from "./categories";

export default createStore({
  state: {
    loading: false,
  },
  mutations: {},
  actions: {},
  getters: {
    loading: (state) => state.loading,
  },
  modules: {
    courses,
    users,
    categories,
  },
});
