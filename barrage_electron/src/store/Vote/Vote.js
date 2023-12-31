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
    const originVoteIndex = votes.findIndex((v) => {
      return v.id === data.id
    })
    state.votes.splice(originVoteIndex, 1, data)
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
