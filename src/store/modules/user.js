import { registration } from "@/services/api-code-burger/user";
import Vue from "vue";

export default {
  state: {
    message: "",
  },
  mutations: {
    SET_MESSAGE(state, message) {
      state.message = message;
    },
  },
  actions: {
    registration({ commit, state }, { name, email, password, repeatPassword }) {
      return new Promise((resolve, reject) => {
        registration({ name, email, password, repeatPassword })
          .then(() => {
            Vue.$log.info({
              timestamp: new Date(),
              message: "Usuário cadastrado com sucesso!",
              data: {
                method: "registration",
                status: 200,
              },
            });
            commit("SET_MESSAGE", "Usuário cadastrado com sucesso!");
            resolve(state.message);
          })
          .catch((error) => {
            if (error.response) {
              const errorCode = error.response.status;
              const errorText = error.response.data.error;

              switch (errorCode) {
                case 400:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "As credenciais inseridas estão incorretas.",
                    data: {
                      method: "registration",
                      errorText: errorText,
                      status: errorCode,
                    },
                  });
                  commit("SET_MESSAGE", "As credenciais inseridas estão incorretas.");
                  break;
                case 401:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "As credenciais inseridas estão incorretas.",
                    data: {
                      method: "registration",
                      errorText: errorText,
                      status: errorCode,
                    },
                  });
                  commit("SET_MESSAGE", "As credenciais inseridas estão incorretas.");
                  break;
                case 500:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "Ocorreu um erro no servidor.",
                    data: {
                      method: "registration",
                      errorText: errorText,
                      status: errorCode,
                    },
                  });
                  commit("SET_MESSAGE", "Ocorreu um erro no servidor.");
                  break;
                default:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "Ocorreu um erro inesperado. Tente novamente.",
                    data: {
                      method: "registration",
                      errorText: errorText,
                      status: errorCode,
                    },
                  });
                  commit("SET_MESSAGE", "Ocorreu um erro inesperado. Tente novamente.");
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
              commit("SET_MESSAGE", "Ocorreu um erro inesperado. Tente novamente.");
            }
            reject(state.message);
          });
      });
    },
  },
};
