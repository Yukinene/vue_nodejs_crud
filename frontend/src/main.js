import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
//router
import router from './routers'

//bootstrap 5 css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

createApp(App).use(router).mount('#app')
