import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// uViewUI
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 引入配置文件
import $config from "@/utils/lib/config.js"
Vue.prototype.$config = $config
// 引入助手函数
import $tool from '@/utils/lib/tool.js'
Vue.prototype.$tool = $tool
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif
Vue.config.silent = true
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif