import { createStore } from "vuex";
import courses from "./courses";
import users from "./users";
import categories from "./categories";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    courses,
    users,
    categories
  },
});
