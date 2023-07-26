const Login = () => import('@/views/Login/Login.vue');

const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

export default authRoutes;