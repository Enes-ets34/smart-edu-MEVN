import axios from "axios";

const appAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default appAxios;
