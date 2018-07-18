import Vue from 'vue'
import conf from 'config'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import { serverCookies } from '../entry/server'

let router
const cookies = new Cookies()
const isClient = process.env.VUE_ENV === 'client'
const instance = Axios.create({
  baseURL: isClient ? '' : `http://${conf.host}:${conf.port}`
})

instance.interceptors.request.use((config) => {
  let token
  if (isClient) {
    token = cookies.get(conf.storageNamespace + 'token')
  } else {
    token = serverCookies.get(conf.storageNamespace + 'token')
  }
  config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

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
