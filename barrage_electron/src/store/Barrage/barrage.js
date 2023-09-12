import { ipcRenderer } from 'electron'
const state = {
  messageList: [],
  users: []
}
const mutations = {
  PUTMESSAGE(state, data) {
    state.messageList.push(data)
    ipcRenderer.send('sendVuexMsg', data)
  },
  SETMESSAGE(state, data) {
    state.messageList = data
  },
  SETUSERS(state, data) {
    state.users.push(data)
  }
}
const actions = {
}
export default {
  namespaced: true, state, mutations, actions
}
