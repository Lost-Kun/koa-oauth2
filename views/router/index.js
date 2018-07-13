import Vue from 'vue'
import Router from 'vue-router'

// import index from '../pages/index'
import login from '../pages/login'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('../pages/index')
      },
      {
        path: '/login',
        component: login
      }
    ]
  })

  return router
}
