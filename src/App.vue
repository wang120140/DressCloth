<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <div id= "pixigame" ref="gameMain">
        <!-- 这里开始写东西 -->
      </div>
    </div>
    <!-- <router-view/> -->
    

  </div>
</template>
<script>
import { SceneManager, Garbage } from "./lib/EasyPIXI.js";
import HomePages from "./components/HomePages.js";
var CanvasApp;
export default {
  name: "app",
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.createCanvasApp();
  },
  methods: {
    //犯了一个低级错误单词拼错  找了半天错误没有找到***
    createCanvasApp() {
      console.log("执行了这句话...");
      let self = this;
      //设置基本样式开始
      CanvasApp = new PIXI.Application({
        width: 1920,
        height: 1080
      });
      CanvasApp.view.style.position = "relative";
      CanvasApp.view.style.width = "100%";
      CanvasApp.view.style.height = "100%";
      this.$refs.gameMain.appendChild(CanvasApp.view);
      //基本样式结束
      //开始加载页面需要的的东西
      SceneManager.App = CanvasApp;
      SceneManager.stage = CanvasApp.stage;
      this.gameStart().then(() => {
        console.log("开始进入游戏首页...");
        SceneManager.run(new HomePages());
      });
    },
    async gameStart() {
      await this.getPromise_resource();
      console.log("游戏资源加载完毕...");
    },
    getPromise_resource() {
      console.log("获取新的资源...");
      let self = this;
      return new Promise(resolve => {
        self.axios.get("./clothSystem.json").then(response => {
          Garbage.clearGarBage("ClothSystem");
          Garbage.setGarBage("ClothSystem", response.data);
        });
        self.axios.get("./gameresource.json").then(response => {
          console.log(response);
          PIXI.loader.add(response.data).load(() => {
            resolve();
          });
        });
      });
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
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
