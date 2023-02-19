import appAxios from "../../utils/appAxios";

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    // Set the categories and their selection status
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
    // Fetch the categories from the API
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
    // Get all the categories
    getCategories: (state) => state.categories,
    // Get the selected categories
    getSelectedCategories: (state) =>
      state.categories.filter((c) => c.selected),
  },
};
