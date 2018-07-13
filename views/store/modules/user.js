export default {
  namespaced: true,
  mutations: {
    SET_VALUE (state, payload) {
      state.user_id = payload.user_id
      state.user_name = payload.user_name
      state.login_name = payload.login_name
      state.token = payload.token
    }
  }
}
