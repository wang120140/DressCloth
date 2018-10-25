<template>
  <div id="app">
    <img @mousedown="dd()" @mouseup="bb()" @click="cc()" alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  methods: {
    dd() {
      console.log("mousedown事件发生了...");
    },
    bb() {
      console.log("mouseup事件发生了...");
    },
    cc() {
      console.log("click事件发生...");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
