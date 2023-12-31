const Home = () => import('@/views/Home/Home.vue');
const Products = () => import('@/views/Products/Products.vue');
const Cart = () => import('@/views/Cart/Cart.vue');

const requireNonEmptyCart = (to, from, next) => {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  cartProducts && cartProducts.length > 0
    ? next()
    : next({ name: "products", params: { cartProducts: 'empty' } });
};

const appRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/products/:categoryId?',
    name: 'products',
    component: Products
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    beforeEnter: requireNonEmptyCart
  }
];

export default appRoutes;