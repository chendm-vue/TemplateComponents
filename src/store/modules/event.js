const state = () => ({
  ajaxError: false,
  ajaxContent: {}
})

const getters = {
  ajaxError: state => state.ajaxError,
  ajaxContent: state => state.ajaxContent
}

const actions = {}

const mutations = {
  setAjaxError (state, b) {
    state.ajaxError = b
  },
  setAjaxContent (state, sc) {
    state.ajaxContent = sc
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
