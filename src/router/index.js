import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/confirm_email',
    name: 'ConfirmEmail',
    // route level code-splitting
    // this generates a separate chunk (SignUpView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ConfirmEmail.vue'),
    props: route => ({ uid: route.query.uid, token: route.query.token })
  },
  {
    path: '/projects',
    name: 'Projects',
    // route level code-splitting
    // this generates a separate chunk (SignUpView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ProjectsView.vue')
  },
  {
    path: '/organizations',
    name: 'Organizations',
    // route level code-splitting
    // this generates a separate chunk (SignUpView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/OrganizationsView.vue')
  },
  {
    path: '/signup',
    name: 'SignUpView',
    // route level code-splitting
    // this generates a separate chunk (SignUpView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    // route level code-splitting
    // this generates a separate chunk (LoginView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/user_account',
    name: 'UserAccountView',
    // route level code-splitting
    // this generates a separate chunk (UserAccountView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/UserAccountView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
