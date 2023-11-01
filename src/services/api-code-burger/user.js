import api from './api-code-burger';

export const registration = async ({name, email, password, repeatPassword}) => {
    const body = {
      name,
      email,
      password,
      repeatPassword
    }
    return await api.post('sign-up', body);
  };