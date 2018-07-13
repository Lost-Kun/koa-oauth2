import Vue from 'vue'
import ElementUI from 'element-ui'
import config from 'config'
import VueLocalStorage from 'vue-ls'
import { sync } from 'vuex-router-sync'

import 'element-ui/lib/theme-chalk/index.css'
import '../styles/index.css'
import { createStore } from '../store'
import { createRouter } from '../router'
import { initHttp } from '../http'

import App from '../App'

Vue.use(ElementUI)
Vue.use(VueLocalStorage, { namespace: config.storageNamespace })

export function createApp () {
  const store = createStore()
  const router = createRouter()
  sync(store, router)
  initHttp(router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
