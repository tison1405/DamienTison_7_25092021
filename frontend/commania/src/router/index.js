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
  },
  {
    path:'/filactu',
    name:'fileactuPage',
    component: () => import('../views/FileActu')
  },
  {
    path:'/profil',
    name:'profilPage',
    component: () => import('../views/profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
