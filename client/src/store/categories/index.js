import appAxios from "../../utils/appAxios";

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    setCategories(state, pCategories) {
      state.categories = pCategories.map((c) => {
        return {
          ...c,
          selected: false,
        };
      });
    },
  },
  actions: {
    fetchCategories({ commit }) {
      appAxios
        .get("/categories")
        .then((res) => {
          commit("setCategories", res?.data?.categories || []);
        })
        .catch((err) => console.error(err));
    },
  },
  getters: {
    getCategories: (state) => state.categories,
    getSelectedCategories: (state) =>
      state.categories.filter((c) => c.selected),
  },
};
