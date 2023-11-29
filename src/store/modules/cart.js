import Vue from "vue";

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
    }
  },
};
