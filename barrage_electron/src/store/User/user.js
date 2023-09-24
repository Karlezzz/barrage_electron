const { User } = require('../../../lib/models')

const state = {
  user: null
}

const mutations = {
  SETUSER(state, data) {
    state.user = data
  }
}

const getters = {
  user: state => User.init(state.user)
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
