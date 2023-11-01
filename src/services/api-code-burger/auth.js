import api from './api-code-burger';

export const login = async ({email, password}) => {
    const body = {
      email,
      password
    }
    return await api.post('login', body);
  };