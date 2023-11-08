import Vue from 'vue'
import VueRouter from 'vue-router'

import MainView from '@/views/MainView.vue'
import TeachingTask from '@/components/TeachingTask.vue'
import PrizeRecord from '@/components/PrizeRecord.vue'
import FacultyInfo from '@/components/FacultyInfo.vue'
import QueryRank from '@/components/QueryRank.vue'

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
      },
      {
        path: 'queryRank',
        component: QueryRank
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
