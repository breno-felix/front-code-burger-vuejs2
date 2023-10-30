import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import authRoutes from './auth';
import userRoutes from './user';

const routes = [
  ...authRoutes,
  ...userRoutes
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;