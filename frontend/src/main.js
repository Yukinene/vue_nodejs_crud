import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
//router
import router from './router'

//bootstrap 5 css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

createApp(App).use(router).mount('#app')
