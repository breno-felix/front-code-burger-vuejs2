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
      const cartIndex = state.cartProducts.findIndex(
        (cartProduct) => cartProduct._id === product._id
      );
      let newCartProducts = [];
      if (cartIndex >= 0) {
        newCartProducts = state.cartProducts;
        newCartProducts[cartIndex].quantity++;
      } else {
        product.quantity = 1;
        newCartProducts = [...state.cartProducts, product];
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
  },
};
