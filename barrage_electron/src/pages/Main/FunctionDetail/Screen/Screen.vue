<template>
  <transition enter-active-class="animate__animated animate__flipInY "
    leave-active-class="animate__animated animate__flipOutY ">
    <div class="box" v-show="isShowScreen">
      <div class="screenRoom" >
        <div class="screen" v-show="isShow"></div>
        <button @click="closeScreen" v-show="isShow" class="close">关闭投屏</button>
        <button @click="startScreen" v-show="!isShow">开启投屏</button>
      </div>
    </div>

  </transition>

</template>

<script>
//投屏
  export default {
    name: 'Screen',
    props: ['isShowScreen'],
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      startScreen() {
        this.isShow = true
      },
      closeScreen() {
        this.isShow = false
      }
    },
  }
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
}
  .screenRoom {
    width: 100%;
    height: 50%;
    border-radius: 15px;
    background-color: #494b4f;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  button {
    width: 150px;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #ea7724;
    color: #f0f0f2;
    font-size: 18px;
    letter-spacing: 2px;
    cursor: pointer;
  }

  button:hover {
    background-color: #d86e22;
  }

  .screen {
    width: 220px;
    height: 150px;
    background-color: #fff;
  }

  .close {
    margin-top: 10px;
    display: block;
  }
</style>