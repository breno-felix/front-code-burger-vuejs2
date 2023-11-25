const Home = () => import('@/views/Home/Home.vue');
const Products = () => import('@/views/Products/Products.vue');

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
  }
];

export default appRoutes;