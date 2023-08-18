<template>
  <div class="headBar"></div>
</template>

<script>
export default {
    name:'HeadBar'
}
</script>

<style scoped>
.headBar {
  z-index: 999;
    position: absolute;
    top: 0;
    left: 0%;
    width: 83%;
    height: 40px;
    background-color: #ffffff00;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    -webkit-app-region: drag;
  }
</style>