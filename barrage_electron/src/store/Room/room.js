import { _createOne, _findAll } from "@/api";

const state = {
  roomInfo: null,
  classRoomInfo: null,
  ipInfo: null,
  roomList:[]
};
const mutations = {
  SETROOMINFO(state, data) {
    state.roomInfo = data
  },
  SETCLASSROOMINFO(state, data) {
    state.classRoomInfo = data
  },
  SETIPPORT(state, data) {
    state.ipInfo = data
  },
  SETROOMLIST(state,data) {
    state.roomList = data
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
  },
  async getRoomList({ commit },{endpoint}) {
    try {
      const result = await _findAll(endpoint)
      if (result) {
        commit('SETROOMLIST', result)
        return
      }
    } catch (error) {
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
