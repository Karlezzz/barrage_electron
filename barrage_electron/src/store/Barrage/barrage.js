import { ipcRenderer } from 'electron'
const state = {
  messageList: []
}
const mutations = {
  PUTMESSAGE(state, data) {
    state.messageList.push(data)
    ipcRenderer.send('sendVuexMsg', data)
  },
  SETMESSAGE(state, data) {
    state.messageList = data
  }
}
const actions = {
}
export default {
  namespaced: true, state, mutations, actions
}
