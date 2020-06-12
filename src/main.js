import Vue from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/styles/reset.css'

// 引入路由模块
import router from '@/router/index.js'
import { Button, Toast, Picker, Uploader, Icon, Dialog, Field, Tab, Tabs, List, PullRefresh, SwipeCell } from 'vant'
Vue.use(Button)
  .use(Toast)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Picker)
  .use(List)
  .use(PullRefresh)
  .use(SwipeCell)

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
