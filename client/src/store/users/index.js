import appAxios from "../../utils/appAxios";
import router from "../../router";

export default {
  // create a namespaced module for better encapsulation
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    // set the current user
    setUser(state, pUser) {
      state.user = pUser;
    },
    // clear the current user
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    // register a new user
    register({ commit }, pUser) {
      appAxios
        .post("/users/signup", pUser)
        .then((res) => {
          if (res.status === 201) {
            const user = res.data.user;
            delete user.password;
            commit("setUser", user);
            localStorage.user = JSON.stringify(user);
            router.push({ name: "Home" });
          } else {
            alert("ERROR");
          }
        })
        .catch((err) => console.error(err));
    },
    // log in the user
    login({ commit }, pUser) {
      appAxios
        .post("/users/login", pUser)
        .then((res) => {
          console.log("res :>> ", res);
          if (res.status === 200) {
            const user = res.data.user;
            delete user.password;
            commit("setUser", user);
            localStorage.user = JSON.stringify(user);
            router.push({ name: "Home" });
          } else {
            alert("ERROR");
          }
        })
        .catch((err) => console.error(err));
    },
    // log out the user
    logout({ commit }) {
      appAxios
        .get("/users/logout")
        .then((res) => {
          if (res.status === 200) {
            router.push({ name: "Home" });
            localStorage.removeItem("user");
            commit("clearUser");
          }
        })
        .catch((err) => console.error(err));
    },
  },
  modules: {},
  getters: {
    // get the current user
    getCurrentUser: (state) => state.user,
    // check if the user is authenticated
    isAuth: (state) => state.user !== null,
  },
};
