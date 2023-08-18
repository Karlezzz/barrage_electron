<template>
  <transition enter-active-class="animate__animated animate__flipInY "
    leave-active-class="animate__animated animate__flipOutY ">
    <div class="box" v-show="isShowShareRoom">
      <div class="screen" >
        <div class="title">房间名称</div>
        <div class="message">
          <p>房间id：12345</p>
          <p>房间密码：无</p>
          <p>房间地址:http://***.***.***/roomid</p>
        </div>
        <!-- 房间地址二维码 -->
        <div class="qrCode" ref="qrCodeUrl"></div>
      </div>
    </div>

  </transition>

</template>

<script>
  import QRCode from 'qrcodejs2'
  export default {
    name: 'ShareRoom',
    props: ['isShowShareRoom'],
    data() {
      return {
        qrcode: null
      }
    },
    methods: {
      createQrCode() {
        this.$nextTick(() => {
          this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: 'https://www.baidu.com/', // 需要转换为二维码的内容
            width: 150,
            height: 150,
            colorDark: '#1d1d1f',
            colorLight: '#e1e1e3',
            correctLevel: QRCode.CorrectLevel.H

          })
        })



      }
    },
    mounted() {
      this.createQrCode()
    },
    beforeDestroy() {}
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }

  .screen {
    width: 100%;
    height: 60%;
    background-color: #323337;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .title {
    margin-left: 5%;
    width: 90%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    letter-spacing: 2px;
    color: #e1e1e3;
  }

  .message {
    width: 90%;
    height: 16%;
    margin-left: 5%;
    text-align: center;
  }

  .message p {
    font-size: 15px;
    color: #e1e1e3;
    padding-top: 5px;
  }

  .qrCode {
    margin-top: 10px;
    margin-bottom: 15%;
    width: 150px;
    height: 130px;
  }
</style>