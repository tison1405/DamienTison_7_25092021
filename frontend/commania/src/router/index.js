import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('../views/loginPage')
  },
  {
    path:'/signIn',
    name:'signIn',
    component: () => import('../views/signInPages')
  }
]

const router = new VueRouter({
  routes
})

export default router