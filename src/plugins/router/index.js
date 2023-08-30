import { createRouter, createWebHistory } from 'vue-router'
import Test from '@/pages/home.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Test
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/pages/auth/login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/components/PageNotFound.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/auth/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  console.log(auth)

  if (authRequired && !auth.userId) {
      auth.returnUrl = to.fullPath;
      return '/auth/login';
  }
});

export default router
