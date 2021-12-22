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
    component: () => import('../views/signInPage')
  },
  {
    path:'/newsQueue',
    name:'newsQueuePage',
    component: () => import('../views/newsQueue')
  },
  {
    path:'/profil',
    name:'profilPage',
    component: () => import('../views/profil')
  },
  {
    path:'/post',
    name:'postPage',
    component: () => import('../views/post')
  },
  {
    path:'/moderator',
    name:'moderator',
    component: () => import('../views/moderator')
  }
]

const router = new VueRouter({
  routes
})

export default router
