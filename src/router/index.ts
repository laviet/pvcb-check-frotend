import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutEway from '@/layout/IndexEway.vue'
import LayoutFees from '@/layout/IndexFees.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/hello',
    name: 'helloName',
    component: () => import(/* webpackChunkName: "about" */ '@/components/HelloWorld.vue')
  },
  {
    path: '/login',
    name: 'loginName',
    component: () => import('@/login/LoginPage.vue')
  },
  {
    path: '/dashboard',
    name: 'DashboardCheckName',
    component: () => import('@/dashboard/DashboardPage.vue')
  },
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
        path: `info`,
        name: "infoMainName",
        component: () => import('@/eway/InfoMain.vue'),
      }
    ],
  },
  {
    path: "/check",
    component: LayoutEway,
    children: [
      {
        path: 'list',
        name: "listCheckName",
        component: () => import('@/check/DataMain.vue')
      },
      {
        path: 'detail/:id',
        name: "detailCheckName",
        component: () => import('@/check/DataDetail.vue')
      }
    ],
  },
  {
    path: "/fees",
    component: LayoutFees,
    children: [
      {
        path: 'transfer-target',
        name: "transferTargetName",
        component: () => import('@/fees/transfer_target/TransferTarget.vue')
      },
      {
        path: 'transfer-target/:id',
        name: "transferTargetDetailName",
        component: () => import('@/fees/transfer_target/TransferTargetChild.vue')
      },
      {
        path: 'transfer-limit',
        name: "transferLimitNam",
        component: () => import('@/fees/transfer_limit/TransferLimit.vue')
      },
      {
        path: 'currency-type',
        name: "currencyTypeName",
        component: () => import('@/fees/currency_type/CurrencyType.vue')
      },
      {
        path: 'exchange-rate',
        name: "exchangeRateName",
        component: () => import('@/fees/exchange_rate/ExchangeRate.vue')
      },
      {
        path: 'partner',
        name: "partnerName",
        component: () => import('@/fees/partner/PartnerData.vue')
      },
      {
        path: 'partner-config',
        name: "partnerConfigName",
        component: () => import('@/fees/partner/PartnerConfig.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// const router = createRouter()

router.beforeEach((to, from, next) => {

  //url c??ng khai c?? th??? truy c???p kh??ng c???n x??c th???c
  const publicPages = ['/login', '/dashboard'];
  //url y??u c???u x??c th???c
  const authRequired = !publicPages.includes(to.path);
  //check xem c?? token hay kh??ng, kh??ng c?? tr??? v??? null
  const loggedIn = localStorage.getItem('userInfo');

  // truy c???p page y??u c???u x??c th???c v?? kh??ng ???????c c??ng khai th?? chuy???n v??? page login
  if (authRequired && !loggedIn) {
    next("/login")
  } else {
    next();
  }
});

export default router
