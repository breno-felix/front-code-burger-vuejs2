import jwt from "jsonwebtoken";
import { login } from "@/services/api-code-burger";

export default {
  state: {
    isAuthenticated: false,
    userId: null,
  },
  getters: {
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
    getUserId(state) {
      return state.userId;
    },
    getToken() {
      return localStorage.getItem("token");
    },
  },
  mutations: {
    SET_IS_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    CLEAR_STATE(state) {
      state.isAuthenticated = false;
      state.userId = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        login({ email, password })
          .then((response) => {
            const token = response.data.accessToken;
            localStorage.setItem("token", token);

            const { userId } = jwt.decode(token);

            commit("SET_USER_ID", userId);
            commit("SET_IS_AUTHENTICATED", true);

            resolve(response);
          })
          .catch((error) => {
            commit("CLEAR_STATE");
            if (error.response) {
              const errorCode = error.response.status;

              switch (errorCode) {
                case 400:
                  reject("Usuário ou senha inválidos.");
                  break;
                case 401:
                  reject("Usuário ou senha inválidos.");
                  break;
                case 500:
                  reject("Ocorreu um erro no servidor.");
                  break;
                default:
                  reject("Ocorreu um erro inesperado. Tente novamente. ");
                  break;
              }
            }
          });
      });
    },
    logout({ commit }) {
      commit("CLEAR_STATE");
    },
  },
};
