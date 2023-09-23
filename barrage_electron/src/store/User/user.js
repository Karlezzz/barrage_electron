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
  votes: state => User.init(state.user)
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
