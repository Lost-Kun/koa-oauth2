import Vue from 'vue'
import Router from 'vue-router'

import index from '../pages/index'
import login from '../pages/login'
import userInfo from '../pages/userInfo'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/login',
        component: login
      },
      {
        path: '/',
        component: index,
        children: [
          {
            path: '/',
            component: userInfo
          }
        ]
      }
    ]
  })

  return router
}
