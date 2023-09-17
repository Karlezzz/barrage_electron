import { _findAll } from '@/api'
import { endpoint } from '@/api/endpoint'
const { Vote } = require('../../../lib/models')

const state = {
  votes: []
}
const mutations = {
  SETVOTES(state, data) { 
    state.votes = [...data,...state.votes].flat(1)
  },
  UPDATEALLVOTES(state, data) {
    state.votes = data
  },
}
const actions = {
  async getAllVotes({ commit }) {
    try {
      const result = await _findAll(endpoint.vote)
      if (result) {
        console.log(result);
        const votes = Vote.initFromArray(result)
        commit('SETVOTES', votes)
        return
      }
    } catch (error) {
      console.log(error)
    }
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
