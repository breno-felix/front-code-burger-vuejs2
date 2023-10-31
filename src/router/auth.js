const Login = () => import('@/views/Login/Login.vue');

const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

export default authRoutes;