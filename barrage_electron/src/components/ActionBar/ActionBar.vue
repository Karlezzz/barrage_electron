<template>
  <div class="bc">
    <div class="browserAction">
      <div class="action" @click="smallBrowser">
        <img src="../../static/image/缩小.png" alt="">
      </div>
      <div class="action" @click="largeBrowser">
        <img src="../../static/image/窗口-窗口化_line.png" alt="">
      </div>
      <div class="action" @click="showSelectBox">
        <img src="../../static/image/关闭.png" alt="">
      </div>
    </div>
    <div class="closeSelect" v-if="isShowCloseSelect">
      <div class="close" @click="closeSelectBox">
        <img src="../../static/image/关闭.png" alt="">
      </div>
      <div class="title">关闭提示</div>
      <div class="select" ref="select">
        <div class="box"><input type="radio" v-model="isClose" :value='two' id="two"><label for="two">最小化到系统托盘</label></div>
        <div class="box"><input type="radio" v-model="isClose" :value='one' id="one"><label for="one">退出应用</label></div>
        
      </div>
      <div class="button">
        <button @click="selectClose">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    remote,ipcRenderer
  } from 'electron'
  export default {
    name: 'ActionBar',
    data() {
      return {
        isClose: false,
        one: true,
        two: false,
        isShowCloseSelect: false
      }
    },
    methods: {

      smallBrowser() {
        remote.getCurrentWindow().minimize()
      },
      largeBrowser() {

        if (remote.getCurrentWindow().isMaximized()) {

          remote.getCurrentWindow().setContentSize(1200, 600)
          // remote.getCurrentWindow().setContentSize(1300,600)
          remote.getCurrentWindow().center()
        } else {
          remote.getCurrentWindow().maximize()
        }
      },  
      closeBrowser() {
        // remote.getCurrentWindow().close()
        ipcRenderer.send('closeMainWindow')
      },
      selectClose() {
        if (this.isClose) this.closeBrowser()
        else if (!this.isClose) this.smallBrowser()
        this.isShowCloseSelect=false
      },
      closeSelectBox() {
        this.isShowCloseSelect = false
      },
      showSelectBox() {
        this.isShowCloseSelect = true
      }

    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  .bc {
    /* z-index: 99; */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

  }



  .browserAction {
    position: absolute;
    top: 1%;
    right: 3%;
    z-index: 999;
    width: 140px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .browserAction .action {

    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 15px;
  }

  .browserAction .action img {

    width: 80%;
    height: 80%;
    cursor: pointer;
  }

  .browserAction .action:hover {
    background-color: #5252523d;
  }

  .closeSelect {
    position: absolute;
    top: 30%;
    left: 30%;
    width: 40%;
    height: 40%;
    background-color: #414146;
    border-radius: 30px;
    z-index: 999;
  }

  .closeSelect .close {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 3%;
    right: 4%;
    cursor: pointer;
  }

  .closeSelect .close img {
    width: 100%;
    height: 100%;
  }

  .closeSelect .title {
    width: 100%;
    height: 15%;
    margin-top: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e1e1e3;
    font-size: 18px;
    letter-spacing: 1px;
  }

  .closeSelect .select {
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .closeSelect .select .box{
    width: 170px;
    cursor: pointer;
    margin-left: 12%;
  }
  .closeSelect .select .box:nth-child(1){
    margin-top: -10px;
  }
  .closeSelect .select .box:nth-child(2){
    margin-top: 10px;
  }

  .closeSelect .select input {
    cursor: pointer;
    margin-right: 5px;
    color: red;
    appearance: none;
  }
  .closeSelect .select input::before {
  content: '';
   width: 8px;
   height: 8px;
   border: 2px solid #ea7724;
   display: inline-block;
   border-radius: 50%;
   vertical-align: middle;
   margin-top: -3px;
  }
  .closeSelect .select input:checked:before{
    content: '';
   width: 10px;
   height: 10px;
   background-color: #ea7724;
   display: inline-block;
   border-radius: 50%;
   vertical-align: middle;
  }
  .closeSelect .select label{
    cursor: pointer;
    font-size: 17px;
    color: #e1e1e3;
  }

  .closeSelect .button {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .closeSelect .button button {
    width: 150px;
    height: 45px;
    border: none;
    border-radius: 30px;
    background-color: #ea7724;
    color: #e1e1e3;
    font-size: 17px;
    letter-spacing: 1px;
    cursor: pointer;
  }
</style>
