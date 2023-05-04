import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index"
import { Dialog } from 'vant';
import "vant/es/toast/style";
import "vant/es/dialog/style";

// 全局注册

createApp(App)
.use(Dialog)
.use(router)
.mount('#app')
