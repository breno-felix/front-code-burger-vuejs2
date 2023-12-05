import jwt from "jsonwebtoken";
import { login } from "@/services/api-code-burger/auth";
import Vue from "vue";

export default {
  state: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    userName: localStorage.getItem("userName") || null,
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserId(state) {
      return state.userId;
    },
    getUserName(state) {
      return state.userName;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
      localStorage.setItem("userId", userId);
    },
    SET_USER_NAME(state, userName) {
      state.userName = userName;
      localStorage.setItem("userName", userName);
    },
    CLEAR_STATE() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        login({ email, password })
          .then((response) => {
            const token = response.data.accessToken;
            const { id, name } = jwt.decode(token);

            commit("SET_TOKEN", token);
            commit("SET_USER_ID", id);
            commit("SET_USER_NAME", name);
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
                  method: "login",
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
          userId: localStorage.getItem("userId"),
          status: 200,
        },
      });
      commit("CLEAR_STATE");
    },
  },
};
