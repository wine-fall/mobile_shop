import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, MessageBox, Toast } from 'mint-ui'
import '../src/mock/mockServer'
// 导入阿里样式表
import './assets/fonts/iconfont.css'
import '../static/css/reset.css'
Vue.prototype.$message = MessageBox
Vue.prototype.$toast = Toast
Vue.component(Button.name, Button)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')