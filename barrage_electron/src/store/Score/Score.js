import { _findAll } from "@/api";

const state = {
  scoreList: [],
};
const mutations = {
  SETSCORELIST(state, data) {
    state.scoreList = data
  }

};
const actions = {
  async getScoreByClassRoomId({ commit }, { endpoint, data }) {
    try {
      const res = await _findAll(endpoint, data)
      if (res) {
        commit("SETSCORELIST", res)
        return
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
