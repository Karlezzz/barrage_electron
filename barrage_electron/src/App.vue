<template>
  <div id="app">
    <ActionBar></ActionBar> 
    <HeadBar></HeadBar>
    <router-view></router-view>  
  </div>
</template>  

<script>
  import 'animate.css'
  import HeadBar from './components/HeadBar/HeadBar.vue'
  import ActionBar from './components/ActionBar/ActionBar.vue'
  export default {
    name: 'App',
    components: {
      HeadBar,
      ActionBar
    },
    methods: {},
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    user-select: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }

  /* 禁止图片被保存 */
  img {
    pointer-events: auto;
    -webkit-user-drag:none;
  }  


  input:focus {
    outline: none;
  } 

  input::-webkit-input-placeholder {
    color: #ffffff;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #ffffff;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #ffffff;
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #ffffff;
  }
</style>