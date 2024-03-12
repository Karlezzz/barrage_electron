import { _findAll } from "@/api";

const state = {
  scoreCommentList: [],
};
const mutations = {
  SETSCORECOMMENTLIST(state, data) {
    state.scoreCommentList = data
  }

};
const actions = {
  async getScoreByClassRoomId({ commit }, { endpoint, data }) {
    try {
      const res = await _findAll(endpoint, data)
      if (res) {
        commit("SETSCORECOMMENTLIST", res)
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
