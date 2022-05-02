import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faArrowLeft, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import '@/assets/_main.scss'

library.add(faMagnifyingGlass, faArrowLeft, faMoon, faSun)

createApp(App)
.component('fa', FontAwesomeIcon)
.use(router).mount('#app')
