import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import routes from './routes'
import store from './store'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
const vuexStore = createStore(store)

app.use(router)
app.use(vuexStore)

app.mount('#app')
