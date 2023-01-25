import axios from "axios";

const appAxios = axios.create({
  baseURL: "https://smartedu-service.onrender.com",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default appAxios;
