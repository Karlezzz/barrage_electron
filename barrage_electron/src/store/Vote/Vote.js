import { _findAll } from '@/api'
import { endpoint } from '@/api/endpoint'

const state = {
  votes: [
    {
      id: 1,
      content: '今晚吃什么',
    },
    {
      id: 2,
      content: '几点下课',
    },
    {
      id: 3,
      content: '有没有作业',
    },
  ],
}
const mutations = {
  SETVOTES(state, data) {
    state.votes.push(data)
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
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
