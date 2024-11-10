import { createApp } from 'vue'
import ToastPlugin from 'vue-toast-notification'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import App from './App.vue'
import router from './router'
import './assets/styles.css'

import 'vue-toast-notification/dist/theme-bootstrap.css'


const app = createApp(App)
app.use(router)
app.use(ToastPlugin)
app.use(LoadingPlugin)
app.mount('#app')
