import { _findAll } from '@/api'
import { endpoint } from '@/api/endpoint'

const state = {
	votes: [],
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
