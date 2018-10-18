import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
//使用公共样式插件
import * as PIXI from "pixi.js"
require("pixi-sound");
Vue.config.productionTip = false
    //使用插件


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')