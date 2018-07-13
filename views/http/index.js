import Vue from 'vue'
import config from 'config'
import Axios from 'axios'

let router
const isClient = process.env.VUE_ENV === 'client'
const instance = Axios.create({
  baseURL: isClient ? '' : `http://${config.host}:${config.port}`
})

// 响应拦截
instance.interceptors.response.use(res => res.data, (e) => {
  switch (e.response.status) {
    case 401:
      router.push('/login')
      Vue.prototype.$notify.error({
        title: '提示',
        message: '未登录，请重新登录',
        duration: 2000
      })
      break

    case 417:
      Vue.prototype.$notify.error({
        title: '提示',
        message: e.response.data.message,
        duration: 2000
      })
      break

    default:
      break
  }
  return Promise.reject(e)
})

Vue.prototype.$http = instance

export const initHttp = _router => (router = _router)
