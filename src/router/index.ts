import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: {
      name: "registryName"
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/qr',
    component: () => import('@/eway/QRCode.vue')
  },
  {
    path: "/eway",
    component: () => import('@/eway/DashboardEway.vue'),
    children: [
      {
        path: 'registry',
        name: "registryName",
        component: () => import('@/eway/RegistrationApp.vue')
      },
      {
        path: 'transfer',
        name: "transferName",
        component: () => import('@/eway/InfoTransfer.vue')
      },
      {
        path: 'info',
        name: "infoMainName",
        component: () => import('@/eway/InfoMain.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
