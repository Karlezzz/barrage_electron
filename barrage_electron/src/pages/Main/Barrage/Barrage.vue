<template>
  <!-- Barrage.vue -->
  <div class="barrage">
    <div class="chatArea">
      <div class="message">
        <div v-for="(item, index) in messageList" :key="index" :class="{
            leftMessage: item.name != myName,
            rightMessage: item.name == myName,
          }">
          <div class="messageAuthor">{{ item.name }}</div>
          <div class="messageWord">{{ item.msg }}</div>
        </div>
      </div>
      <div class="input">
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage" />
        <div class="emoji">
          <img src="../image/emoji.png" alt="" />
        </div>
        <div class="send" @click="sendMessage">
          <img src="../image/Send.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    nanoid
  } from "nanoid";
  import io from 'socket.io-client';
  const socket = io('ws://localhost:3001');
  export default {
    name: "Barrage",
    data() {
      return {
        myName: "admin",
        myId: nanoid(),
        newMessage: "",
        messageList: this.$store.state.barrage_chat.messageList,
        reConnectTimer: null,
        heartBeatTimer: null,
        ws: null,
      };
    },
    methods: {
      sendMessage() {
        const newMsg = {
          type: "chat",
          msg: this.newMessage,
          uid: this.myId,
          rid: "1",
          name: "admin",
        };
        try {
          socket.emit('sendMsg', JSON.stringify(newMsg));
        } catch (error) {
          console.log(error);
        }
        this.newMessage = "";
      },

      initSocket() {
        //一定要移除旧的message监听，否则会出现重复监听的状况
        // socket.removeListener('message');
        //这是移除所有监听
        socket.removeAllListeners();
        socket.on('broadcast', (data) => {
          console.log(data);
          // this.messageContent.push(JSON.parse(data))
          this.$store.dispatch('saveMessage', JSON.parse(data))
        })
      }
    },
    mounted() {
      let div = document.querySelector(".message");
      div.scrollTop = div.scrollHeight;

      this.initSocket()
    },
    watch: {
      // 屏幕滚动始终在最后一条
      messageList() {
        this.$nextTick(() => {
          let div = document.querySelector(".message");
          div.scrollTop = div.scrollHeight;
        });
      },
    },
    beforeDestroy() {},
  };
</script>

<style scoped>
  * {
    user-select: text;
  }

  .barrage {
    float: left;
    width: 55%;
    height: 90%;
    /* background-color: yellow; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .barrage .chatArea {
    width: 98%;
    height: 98%;
    background-color: #222325;
    border-radius: 10px;
  }

  .barrage .chatArea .message {
    width: 98%;
    margin-left: 1%;
    height: 88%;
    overflow: scroll;
    margin-top: 10px;
  }

  .barrage .chatArea .message .leftMessage {
    width: 50%;
    margin: 5px 0 10px 10px;
    word-break: break-all;
    white-space: pre-line;
    margin-top: 10px;
  }

  .barrage .chatArea .message .leftMessage .messageAuthor {
    font-size: 90%;
    color: #e1e1e3;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .barrage .chatArea .message .leftMessage .messageWord {
    margin-top: 5px;
    background-color: #494b4f;
    border-radius: 20px;
    padding: 10px 15px 10px 15px;
    color: #e1e1e3;
    font-size: 100%;
    /* border: 1px solid rgba(152, 152, 152, 0.092); */
    display: inline-block;
  }

  .barrage .chatArea .message .rightMessage {
    width: 50%;
    text-align: right;
    margin: 0 10px 5px auto;
    word-break: break-all;
    white-space: pre-line;
  }

  .barrage .chatArea .message .rightMessage .messageAuthor {
    text-align: right;
    margin-right: 5px;
    font-size: 90%;
    color: #e1e1e3;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .barrage .chatArea .message .rightMessage .messageWord {
    margin-top: 10px;
    background-color: #ea7724;
    border-radius: 20px;
    padding: 10px 15px 10px 15px;
    color: #e1e1e3;
    font-size: 100%;
    text-align: left;
    /* border: 1px solid rgba(152, 152, 152, 0.092); */
    display: inline-block;
  }

  .barrage .chatArea .input {
    width: 98%;
    height: 9%;
    display: flex;
    align-items: center;
    margin-left: 1%;
  }

  .barrage .chatArea .input input {
    width: 80%;
    height: 80%;
    margin-left: 2%;
    border: none;
    border-bottom: 1px solid #ea7724;
    background-color: #ffffff00;
    color: #e1e1e3;
    font-size: 17px;
    letter-spacing: 1px;
    padding-left: 20px;
  }

  .barrage .chatArea .input input:focus {
    border-bottom: 2px solid #ea7724;
  }

  .barrage .chatArea .emoji {
    margin-left: 1%;
    width: 8%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #323337;
    border-radius: 10px;
  }

  .barrage .chatArea .emoji img {
    width: 30px;
    height: 30px;
  }

  .barrage .chatArea .send {
    width: 8%;
    height: 80%;
    margin-left: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #323337;
    border-radius: 10px;
  }

  .barrage .chatArea .send img {
    width: 30px;
    height: 30px;
  }
</style>
