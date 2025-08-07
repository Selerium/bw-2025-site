import { createWebHistory, createRouter } from 'vue-router'
import Home from '../components/Home.vue'
import Success from '../components/Success.vue'
import Canceled from '../components/Canceled.vue'
import AdminPanel from '../components/AdminPanel.vue'

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'success', path: '/success', component: Success },
  { name: 'canceled', path: '/canceled', component: Canceled },
  { name: 'admin', path: '/admin', component: AdminPanel },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})