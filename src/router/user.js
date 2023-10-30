const Registration = () => import('@/views/Registration/Registration.vue');

const userRoutes = [
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  }
];

export default userRoutes;