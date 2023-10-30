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

export const registration = async ({name, email, password, repeatPassword}) => {
  const body = {
    name,
    email,
    password,
    repeatPassword
  }
  return await api.post('sign-up', body);
};