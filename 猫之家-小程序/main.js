import Vue from 'vue'
import App from './App'
import axios from 'axios'
import { myRequest } from 'utils/api.js'

Vue.config.productionTip = false
Vue.prototype.$http =  axios
Vue.prototype.$api =  myRequest

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
