import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/login',
        component: () => import('../pages/login')
      }
    ]
  })

  return router
}
