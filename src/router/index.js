import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入路由组件
// const Login = path => import('@/views/' + path)

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

export default router
