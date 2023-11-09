import { listProducts } from "@/services/api-code-burger/product";
import formatCurrency from "@/utils/formatCurrency";
import Vue from "vue";

export default {
  actions: {
    listProducts() {
      return new Promise((resolve, reject) => {
        listProducts()
          .then((products) => {
            const productsFormated = products.data
              .map((product) => {
                return {
                  ...product,
                  formatedPrice: formatCurrency(product.price),
                };
              });
            Vue.$log.info({
              timestamp: new Date(),
              message: "Lista de produtos carregada com sucesso!",
              data: {
                method: "listProducts",
                userId: localStorage.getItem("userId"),
                status: 200,
              },
            });
            resolve(productsFormated);
          })
          .catch((error) => {
            Vue.$log.error({
              timestamp: new Date(),
              message: "Ocorreu um erro inesperado. Tente novamente.",
              data: {
                method: "listProducts",
                userId: localStorage.getItem("token"),
                errorText: error,
                status: 500,
              },
            });
            reject("Ocorreu um erro inesperado. Tente novamente.");
          });
      });
    },
    listProductsOffer() {
      return new Promise((resolve, reject) => {
        listProducts()
          .then((products) => {
            const productsOffer = products.data
              .filter((product) => product.offer)
              .map((product) => {
                return {
                  ...product,
                  formatedPrice: formatCurrency(product.price),
                };
              });
            Vue.$log.info({
              timestamp: new Date(),
              message: "Lista de produtos em oferta carregada com sucesso!",
              data: {
                method: "listProductsOffer",
                userId: localStorage.getItem("userId"),
                status: 200,
              },
            });
            resolve(productsOffer);
          })
          .catch((error) => {
            Vue.$log.error({
              timestamp: new Date(),
              message: "Ocorreu um erro inesperado. Tente novamente.",
              data: {
                method: "listProductsOffer",
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
