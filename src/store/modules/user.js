export default {
  namespaced: true,
  state: {
    mjPcToken: localStorage.getItem('mj-pc-token')
  },
  mutations: {
    updateToken (state, newToken) {
      state.mjPcToken = newToken
      localStorage.setItem('mj-pc-token', newToken)
    }
  }
}
