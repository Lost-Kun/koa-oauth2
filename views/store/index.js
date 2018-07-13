import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      user: {
        state: {
          user_id: '',
          user_name: '',
          login_name: '',
          token: ''
        },
        ...user
      }
    }
  })
}
