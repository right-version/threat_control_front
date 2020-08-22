import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Result from '../views/Result.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: Result
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
