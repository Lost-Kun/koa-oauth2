import Vue from 'vue'
// import iView from 'iview'
// import config from 'config'
// import VueI18n from 'vue-i18n'
// import VueLocalStorage from 'vue-ls'
import { sync } from 'vuex-router-sync'
// import zhLocaleIView from 'iview/dist/locale/zh-CN'
// import enLocaleIView from 'iview/dist/locale/en-US'

// import '../styles/index.css'
// import { initAPI } from '../api'
// import enLocale from '../locale/en'
// import zhLocale from '../locale/zh-CN'
import { createStore } from '../store'
import { createRouter } from '../router'

import App from '../App'

// if (typeof window !== 'undefined') {
//   Vue.use(require('v-click-outside'))
//   Vue.use(require('vue-shortkey'), {
//     prevent: ['input', 'textarea']
//   })
// }

// Vue.use(VueLocalStorage, { namespace: config.storageNamespace })
// Vue.use(VueI18n)

// const i18n = new VueI18n({
//   locale: Vue.ls.get('locale') || 'zh-CN',
//   fallbackLocale: 'zh-CN',
//   messages: {
//     'zh-CN': {
//       ...zhLocaleIView,
//       ...zhLocale
//     },
//     'en': {
//       ...enLocaleIView,
//       ...enLocale
//     }
//   }
// })

// Vue.use(iView, {
//   i18n: function (path, options) {
//     let value = i18n.t(path, options)
//     if (value !== null && value !== undefined) return value
//     return ''
//   }
// })

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
    // i18n,
    render: h => h(App)
  })
  return { app, router, store }
}