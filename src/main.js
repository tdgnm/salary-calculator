import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import store from './store/store.js'
import { addIcons } from 'oh-vue-icons'
import { RiDeleteBinLine } from 'oh-vue-icons/icons'

addIcons(RiDeleteBinLine)

store.subscribe((mutation, state) => {
    localStorage.setItem('users', JSON.stringify(state.users))  
    localStorage.setItem('idx', JSON.stringify(state.idx))
})

createApp(App).use(store).mount('#app')
