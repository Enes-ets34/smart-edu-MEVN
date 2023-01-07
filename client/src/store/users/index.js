import appAxios from "../../utils/appAxios";
import router from "../../router";
export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, pUser) {
      state.user = pUser;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    register({ commit }, pUser) {
      appAxios
        .post("/users/signup", pUser)
        .then((res) => {
          if (res.status === 201) {
            commit("setUser", res.data.user);
            localStorage.user = JSON.stringify(res.data.user);
            router.push({ name: "Home" });
          }
        })
        .catch((err) => console.error(err));
    },
    login({ commit }, pUser) {
      appAxios
        .post("/users/login", pUser)
        .then((res) => {
          console.log("res :>> ", res);
          if (res.status === 200) {
            commit("setUser", res.data.user);
            localStorage.user = JSON.stringify(res.data.user);
            router.push({ name: "Home" });
          }
        })
        .catch((err) => console.error(err));
    },
    logout({ commit }) {
      appAxios
        .get("/users/logout")
        .then((res) => {
          if (res.status === 200) {
            localStorage.removeItem("user");
            commit("clearUser");
            router.push({ name: "Home" });
          }
        })
        .catch((err) => console.error(err));
    },
  },
  modules: {},
  getters: {
    getCurrentUser: (state) => state.user,
    isAuth: (state) => state.user !== null,
  },
};
