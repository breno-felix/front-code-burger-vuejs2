import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export default api;
