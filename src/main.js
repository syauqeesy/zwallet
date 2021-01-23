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

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/auth/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (localStorage.getItem('token')) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

const app = createApp(App)
const vuexStore = createStore(store)

app.use(router)
app.use(vuexStore)

app.mount('#app')
