import jwt from "jsonwebtoken";
import { login } from "@/services/api-code-burger/auth";
import Vue from "vue";

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
      localStorage.clear();
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        login({ email, password })
          .then((response) => {
            const token = response.data.accessToken;
            const { id } = jwt.decode(token);

            localStorage.setItem("token", token);
            localStorage.setItem("userId", id);

            commit("SET_USER_ID", id);
            commit("SET_IS_AUTHENTICATED", true);
            Vue.$log.info({
              timestamp: new Date(),
              message: "Usuário logado.",
              data: {
                method: "login",
                userId: id,
                status: 200,
              },
            });
            resolve(response);
          })
          .catch((error) => {
            commit("CLEAR_STATE");
            if (error.response) {
              const errorCode = error.response.status;
              const errorText = error.response.data.error;

              switch (errorCode) {
                case 400:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "Usuário ou senha inválidos.",
                    data: {
                      method: "login",
                      errorText: errorText,
                      status: errorCode,
                    },
                  });
                  reject("Usuário ou senha inválidos.");
                  break;
                case 401:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "Usuário ou senha inválidos.",
                    data: {
                      method: "login",
                      errorText: errorText,
                      status: errorCode,
                    },
                  });
                  reject("Usuário ou senha inválidos.");
                  break;
                case 500:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "Ocorreu um erro no servidor.",
                    data: {
                      method: "login",
                      errorText: errorText,
                      status: errorCode,
                    },
                  });
                  reject("Ocorreu um erro no servidor.");
                  break;
                default:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "Ocorreu um erro inesperado. Tente novamente.",
                    data: {
                      method: "login",
                      errorText: errorText,
                      status: errorCode,
                    },
                  });
                  reject("Ocorreu um erro inesperado. Tente novamente.");
                  break;
              }
            } else {
              Vue.$log.error({
                timestamp: new Date(),
                message: "Ocorreu um erro inesperado. Tente novamente.",
                data: {
                  method: "registration",
                  errorText: error,
                  status: 500,
                },
              });
              reject("Ocorreu um erro inesperado. Tente novamente.");
            }
          });
      });
    },
    logout({ commit }) {
      Vue.$log.info({
        timestamp: new Date(),
        message: "Usuário deslogado.",
        data: {
          method: "logout",
          userId: commit.state.userId,
          status: 200,
        },
      });
      commit("CLEAR_STATE");
    },
  },
};
