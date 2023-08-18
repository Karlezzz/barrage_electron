import {nanoid} from 'nanoid'
import { ipcRenderer, IpcRenderer } from 'electron'
const state={
    messageList:[]  
}
const mutations={
    PUTMESSAGE(state,data){ 
        state.messageList.push(data)  
        ipcRenderer.send('sendVuexMsg',data)
    } 
}
const actions={
    saveMessage({commit},data){  
         commit('PUTMESSAGE',data)
        
    } 
}
export default{
    state,mutations,actions
}