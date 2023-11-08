import Vue from 'vue'
import VueRouter from 'vue-router'

import MainView from '@/views/MainView.vue'
import DeviceList from '@/components/DeviceList.vue'
import DeviceControl from '@/components/DeviceControl.vue'
import AlarmInfo from '@/components/AlarmInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/mainview'
  },
  {
    path: '/mainview',
    name: 'MainView',
    component: MainView,
    children: [
      {
        path: '/',
        redirect: 'deviceList'
      },
      {
        path: 'deviceList',
        component: DeviceList
      },
      {
        path: 'deviceControl',
        component: DeviceControl
      },
      {
        path: 'alarmInfo',
        component: AlarmInfo
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
