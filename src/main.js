import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.less'
import 'amfe-flexible'
// 加载 dayjs 初始化配置
import './utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
