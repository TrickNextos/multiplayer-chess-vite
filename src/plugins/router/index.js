import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.vue'
import { useAuthStore } from '@/stores/auth'
import axios from '@/plugins/axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/about.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/auth/login.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/auth/register.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  document.title = to.name;

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/auth/login', '/auth/register'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  const isAuth = await axios.get('auth/').then(resp => {
    return resp.status == 200
  }).catch(_err => {
    return false
  })

  if (authRequired && !isAuth) {
      auth.returnUrl = to.fullPath;
      return '/auth/login';
  }
});



export default router
