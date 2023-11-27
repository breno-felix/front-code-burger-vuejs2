import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import user from "./modules/user";
import category from "./modules/category";
import product from "./modules/product";
import cart from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        category,
        product,
        cart
    }
})