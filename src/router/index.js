import Vue from 'vue'
import VueRouter from 'vue-router'

import MainView from '@/views/MainView.vue'
import LoginView from '@/views/LoginView.vue'
import TeachingTask from '@/views/subviews/TeachingTask.vue'
import PrizeRecord from '@/views/subviews/PrizeRecord.vue'
import FacultyInfo from '@/views/subviews/FacultyInfo.vue'
import QueryRank from '@/views/subviews/QueryRank.vue'
import Inputachi from '@/views/subviews/subpage/Inputachi.vue'
import Allachi from '@/views/subviews/subpage/Allachi.vue'

// 下面4行代码用于修复重复跳转同一个路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/mainview'
  },
  {
    path: '/mainview',
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
        path: 'teachingTask',
        component: TeachingTask
      },
      {
        path: 'prizeRecord',
        component: PrizeRecord
        // children: [
        //   {
        //     path: '/',
        //     redirect: 'inputachi'
        //   },
        //   {
        //     path: 'inputachi',
        //     component: Inputachi
        //   },
        //   {
        //     path: 'allachi',
        //     component: Allachi
        //   }
        // ]
      },
      {
        path: 'queryRank',
        component: QueryRank
      }
    ]
  },
  {
    path: '/loginview',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
