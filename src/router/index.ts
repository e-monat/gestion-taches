import { createRouter, createWebHistory } from '@ionic/vue-router'
import Tabs from '../views/Tabs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/nouvelle-tache',
    component: () => import('../views/NouvelleTache.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/mes-taches'
      },
      {
        path: 'mes-taches',
        component: () => import('../views/tabs/MesTaches.vue')
      },
      {
        path: 'autres',
        component: () => import('../views/tabs/Autres.vue')
      },
      {
        path: 'archivees',
        component: () => import('../views/tabs/Archivees.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
