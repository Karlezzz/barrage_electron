import { _findAll } from "@/api";

const state = {
  scoreList: [],
};
const mutations = {
  SETCOMMENTLIST(state, data) {
    state.scoreList = data
  }

};
const actions = {
  async getCommentByClassRoomId({ commit }, { endpoint, data }) {
    try {
      const res = await _findAll(endpoint, data)
      if (res) {
        commit("SETCOMMENTLIST", res)
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
