import Vue from "vue";
import { newOrder } from "@/services/api-code-burger/order";

export default {
  state: {
    cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
  },
  getters: {
    getCartProducts(state) {
      return state.cartProducts;
    },
  },
  mutations: {
    SET_CART_PRODUCTS(state, cartProducts) {
      state.cartProducts = cartProducts;
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    },
    CLEAR_CART_PRODUCTS() {
      localStorage.removeItem("cartProducts");
    },
  },
  actions: {
    putProductInCart({ commit, state }, product) {
      let newCartProducts = state.cartProducts;
      const cartIndex = newCartProducts.findIndex(
        (cartProduct) => cartProduct._id === product._id
      );
      if (cartIndex >= 0) {
        newCartProducts[cartIndex].quantity++;
      } else {
        product.quantity = 1;
        newCartProducts.push(product);
      }
      commit("SET_CART_PRODUCTS", newCartProducts);
      Vue.$log.info({
        timestamp: new Date(),
        message: "Produto adicionado ao carrinho.",
        data: {
          method: "putProductInCart",
          userId: localStorage.getItem("userId"),
          productId: product._id,
          status: 200,
        },
      });
    },

    decreaseProductFromCart({ commit, state }, productId) {
      let newCartProducts = state.cartProducts;
      const cartIndex = newCartProducts.findIndex(
        (cartProduct) => cartProduct._id === productId
      );
      if (newCartProducts[cartIndex].quantity > 1) {
        newCartProducts[cartIndex].quantity--;
        commit("SET_CART_PRODUCTS", newCartProducts);
        Vue.$log.info({
          timestamp: new Date(),
          message: "Produto decrescido do carrinho.",
          data: {
            method: "decreaseProductFromCart",
            userId: localStorage.getItem("userId"),
            productId: productId,
            status: 200,
          },
        });
      }
    },

    removeProductFromCart({ commit, state }, productId) {
      let newCartProducts = state.cartProducts;
      const cartIndex = newCartProducts.findIndex(
        (cartProduct) => cartProduct._id === productId
      );
      newCartProducts.splice(cartIndex, 1);
      commit("SET_CART_PRODUCTS", newCartProducts);
      Vue.$log.info({
        timestamp: new Date(),
        message: "Produto removido do carrinho.",
        data: {
          method: "removeProductFromCart",
          userId: localStorage.getItem("userId"),
          productId: productId,
          status: 200,
        },
      });
    },

    clearCart({ commit }) {
      commit("CLEAR_CART_PRODUCTS");
      Vue.$log.info({
        timestamp: new Date(),
        message: "Carrinho limpo.",
        data: {
          method: "clearCart",
          userId: localStorage.getItem("userId"),
          status: 200,
        },
      });
    },

    submitOrder({ state }) {
      const order = {
        products : state.cartProducts.map((product) => {
          return {
            product_id: product._id,
            quantity: product.quantity
          }
        })
      }

      return new Promise((resolve, reject) => {
        newOrder(order)
          .then(() => {
            Vue.$log.info({
              timestamp: new Date(),
              message: "Pedido enviado com sucesso.",
              data: {
                method: "submitOrder",
                userId: localStorage.getItem("userId"),
                order,
                status: 201,
              },
            });
            resolve("Pedido enviado com sucesso.");
          })
          .catch((error) => {
            if (error.response) {
              const errorCode = error.response.status;
              const errorText = error.response.data.error;

              switch (errorCode) {
                case 400:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "Algum parâmetro é inválido.",
                    data: {
                      method: "submitOrder",
                      errorText: errorText,
                      status: errorCode,
                    },
                  });
                  reject("Algum parâmetro é inválido.");
                  break;
                case 500:
                  Vue.$log.error({
                    timestamp: new Date(),
                    message: "Ocorreu um erro no servidor.",
                    data: {
                      method: "submitOrder",
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
                      method: "submitOrder",
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
                  method: "submitOrder",
                  errorText: error,
                  status: 500,
                },
              });
              reject("Ocorreu um erro inesperado. Tente novamente.");
            }
          });
      });
    }
  },
};
