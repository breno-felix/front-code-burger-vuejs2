import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const login = async ({email, password}) => {
  const body = {
    email,
    password
  }
  return await api.post('login', body);
};