import Vue from 'vue'
import App from './App'
import zhouWeiNavBar from "@/components/zhouWei-navBar";

Vue.config.productionTip = false;

App.mpType = 'app'

Vue.component("nav-bar", zhouWeiNavBar);

const app = new Vue({
    ...App
})
app.$mount()
