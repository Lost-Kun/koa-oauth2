import Vue from 'vue'
// import config from 'config'
import { sync } from 'vuex-router-sync'

// import '../styles/index.css'
// import { initAPI } from '../api'
import { createStore } from '../store'
import { createRouter } from '../router'

import App from '../App'

Vue.mixin({
  data () {
    return {
      pageAnimated: false
    }
  },
  mounted () {
    this.pageAnimated = true
  }
})

export function createApp () {
  const store = createStore()
  const router = createRouter()
  sync(store, router)
  // initAPI(router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
