import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/layout'),
    children: [
      { path: 'article', component: () => import('@/views/article') },
      { path: 'dashboard', component: () => import('@/views/dashboard') }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 加入导航守卫
router.beforeEach((to, from, next) => {
  // to.path:要访问的地址
  // from.path: 从哪里来
  // next() 放行  next('/login')不放行,跳转到登录
  if (to.path !== '/login' && store.state.user.mjPcToken === '') {
    next('/login')
  }
  next()
})

export default router
