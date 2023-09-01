import {
    reqRoomInfoList
} from "@/api";
const state = {
    roomInfoList: [],
};
const mutations = {
    GETROOMINFOLIST(state, data) {
        state.roomInfoList = data
    }
};
const actions = {
    // 获取房间信息列表
    async getRoomInfoList({
        commit
    }) {
        // let result = await reqRoomInfoList();
        // commit('GETROOMINFOLIST', result.data);

    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
