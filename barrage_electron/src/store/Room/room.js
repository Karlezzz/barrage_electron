import { _createOne } from "@/api";

const state = {
  roomInfo: null,
  classRoomInfo: null
};
const mutations = {
  SETROOMINFO(state, data) {
    state.roomInfo = data
  },
  SETCLASSROOMINFO(state, data) {
    state.classRoomInfo = data
  }
};
const actions = {
  async enterRoom({ commit }, { endpoint, data }) {
    try {
      const result = await _createOne(endpoint, data)
      if (result) {
        commit('SETROOMINFO', result)
        return
      }
    }
    catch (error) {
      console.log(error)
    }
  }

};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
