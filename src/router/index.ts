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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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
