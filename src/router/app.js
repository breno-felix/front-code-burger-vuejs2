const Home = () => import('@/views/Home/Home.vue');

const appRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
];

export default appRoutes;