import { listCategories } from "@/services/api-code-burger/category";
import Vue from "vue";

export default {
  actions: {
    listCategories() {
      return new Promise((resolve, reject) => {
        listCategories()
          .then((categories) => {
            Vue.$log.info({
              timestamp: new Date(),
              message: "Lista de categorias carregada com sucesso!",
              data: {
                method: "listCategories",
                userId: localStorage.getItem("userId"),
                status: 200,
              },
            });
            resolve(categories.data);
          })
          .catch((error) => {
            Vue.$log.error({
              timestamp: new Date(),
              message: "Ocorreu um erro inesperado. Tente novamente.",
              data: {
                method: "listCategories",
                userId: localStorage.getItem("token"),
                errorText: error,
                status: 500,
              },
            });
            reject("Ocorreu um erro inesperado. Tente novamente.");
          });
      });
    },
  },
};
