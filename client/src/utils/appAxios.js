import axios from "axios";
import store from "../store";

// Create an instance of axios with some default options
const appAxios = axios.create({
  // baseURL: "http://localhost:4000", // Local server
  baseURL: "https://smartedu-service.onrender.com", // Production server
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    noLoading: true,
  },
});

// Intercept requests to the server and modify them if necessary
appAxios.interceptors.request.use((config) => {
  if (config?.headers?.noLoading === true) {
    // If the request has the 'noLoading' header, don't show the loading spinner
    store.state.loading = false;
  } else {
    // Otherwise, show the loading spinner
    store.state.loading = true;
  }
  return config;
});

// Intercept responses from the server and modify them if necessary
appAxios.interceptors.response.use((response) => {
  // Hide the loading spinner after a short delay to ensure a smooth user experience
  setTimeout(() => {
    store.state.loading = false;
  }, 500);
  return response;
});

export default appAxios;
