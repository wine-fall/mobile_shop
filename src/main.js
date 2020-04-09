import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入阿里样式表
import './assets/fonts/iconfont.css'
import '../static/css/reset.css'
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')