import axios from "axios";

const appAxios = axios.create({
  baseURL: "https://smartedu-service.onrender.com",
  // baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default appAxios;
