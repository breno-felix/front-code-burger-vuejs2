import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
