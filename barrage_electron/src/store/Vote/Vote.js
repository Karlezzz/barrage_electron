import { _findAll } from '@/api'
import { endpoint } from '@/api/endpoint'
const { Vote } = require('../../../lib/models')

const state = {
  votes: []
}
const mutations = {
  SETVOTES(state, data) {
    state.votes = [...data, ...state.votes].flat(1)
  },
  UPDATEVOTE(state, data) {
    const { votes } = state
    const vs = votes.map(v => {
      if (v.id === data.id) return data
      else return v
    })
    state.votes = vs
  },
}
const actions = {
  async getAllVotes({ commit }) {
    try {
      const result = await _findAll(endpoint.vote)
      if (result) {
        commit('SETVOTES', result)
        return
      }
    } catch (error) {
      console.log(error)
    }
  },
}

const getters = {
  votes: state => Vote.initFromArray(state.votes)
  // votes: state => Vote.initFromArray(state.votes)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
