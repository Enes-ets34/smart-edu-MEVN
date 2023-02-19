import axios from "axios";
import store from "../store";

const appAxios = axios.create({
  baseURL: "https://smartedu-service.onrender.com",
  //  baseURL: "http://localhost:4000",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    noLoading: true,
  },
});
appAxios.interceptors.request.use((config) => {
  if (config?.headers?.noLoading === true) {
    store.state.loading = false;
  } else {
    store.state.loading = true;
  }
  return config;
});

appAxios.interceptors.response.use((response) => {
  setTimeout(() => {
    store.state.loading = false;
  }, 500);
  return response;
});
export default appAxios;
