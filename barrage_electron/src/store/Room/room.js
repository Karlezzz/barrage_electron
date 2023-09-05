import { _createOne } from "@/api";

const state = {
  roomInfo: {}
};
const mutations = {
  SETROOMINFO(state, data) {
    state.roomInfo = data
  }
};
const actions = {
  // 获取房间信息列表
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
