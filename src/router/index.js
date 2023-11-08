import Vue from 'vue'
import VueRouter from 'vue-router'

import MainView from '@/views/MainView.vue'
import DeviceControl from '@/components/DeviceControl.vue'
import AlarmInfo from '@/components/AlarmInfo.vue'
import FacultyInfo from '@/components/FacultyInfo'

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
        redirect: 'facultyInfo'
      },
      {
        path: 'facultyInfo',
        component: FacultyInfo
      },
      {
        path: 'deviceControl', // teachingTask
        component: DeviceControl
      },
      {
        path: 'alarmInfo', // prizeRecord
        component: AlarmInfo
      },
      {
        path: 'alarmInfo', // query
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
