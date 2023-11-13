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

let isAuthenticated = false

// 下面4行代码用于修复重复跳转同一个路由地址报错
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
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
				name: 'facultyInfo',
				path: 'facultyInfo',
				component: FacultyInfo
			},
			{
				name: 'teachingTask',
				path: 'teachingTask',
				component: TeachingTask
			},
			{
				name: 'prizeRecord',
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
		name: 'login',
		path: '/loginview',
		component: LoginView
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach(async (to, from, next) => {
	isAuthenticated = window.localStorage.isAuthenticated
	console.log('是否登录？' + isAuthenticated)
	if (
		// 检查用户是否已登录
		!isAuthenticated &&
		//  避免无限重定向
		to.name !== 'login'
	) next({ name: 'login' });
	// 将用户重定向到登录页面
	else next()
})

export default router
