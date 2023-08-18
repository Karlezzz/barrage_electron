<template>
  <div class="box">
    <div class="main">
      <div class="head">
        <div class="logo">
          <img src="../../assets/dgut2.png" alt="">
        </div>
        <div class="roomName">
          <div class="name">体育课</div>
          <div class="id">id:12345</div>
        </div>
      </div>
      <div class="body">
        <Function></Function>
        <Barrage></Barrage>
        <FunctionDetail></FunctionDetail>
      </div>
    </div>
  </div>

</template>

<script>
  import Function from './Function/Function.vue'
  import Barrage from './Barrage/Barrage.vue'
  import FunctionDetail from './FunctionDetail/FunctionDetail.vue'
  export default {
    name: 'Main',
    components: {
      Function,
      Barrage,
      FunctionDetail
    },
  } 
</script>

<style scoped>
  .box {
    /* height: 100%; */
    height: 100vh;
    width: 100%;
    border-radius: 50px;
  }

  .main {
    position: relative;
    width: 100%;
    height: 100%;
    /* min-height: 100vh; */
    background-color: #1d1d1f;
    overflow: hidden;
    border-radius: 50px;
  }

  .head {
    width: 100%;
    /* height: 90px; */
    height: 15%;
    /* background-color: #ff0000; */
  }

  .head .logo {
    width: 200px;
    height: 100%;
    margin-left: 20px;
    /* background-color: red; */
  }

  .head .logo img {
    height: 40px;
    margin-top: 25px;
    margin-left: 20px;
  }

  .head .roomName {
    position: absolute;
    top: 0;
    left: 250px;
    /* width: 150px; */
    /* height: 90px; */
    height: 15%;

    color: #e1e1e3;
    font-size: 30px;
    letter-spacing: 2px;
    text-align: center;
    padding: 0 20px 0 20px;
    line-height: 3;
    font-weight: 700;
  }

  .head .roomName .id {
    position: absolute;
    top: 30px;
    left: 130px;
    /* background-color: red; */
    height: 50px;
    font-size: 14px;
  }

  .body {
    /* background-color: rgb(255, 255, 255); */
    width: 100%;
    /* height: 510px; */
    height: 90%;
  }
</style>