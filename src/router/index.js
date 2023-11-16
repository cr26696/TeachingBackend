import Vue from 'vue'
import VueRouter from 'vue-router'

import MainView from '@/views/MainView.vue'
import LoginView from '@/views/LoginView.vue'
import TeachingTask from '@/views/subviews/TeachingTask.vue'
import PrizeRecord from '@/views/subviews/PrizeRecord.vue'
import FacultyInfo from '@/views/subviews/FacultyInfo.vue'
import QueryRank from '@/views/subviews/QueryRank.vue'
// eslint-disable-next-line
import Inputachi from '@/views/subviews/subpage/Inputachi.vue'
// eslint-disable-next-line
import Allachi from '@/views/subviews/subpage/Allachi.vue'

let isAuthenticated = false

// 修复重复跳转同一个路由地址报错
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push
// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace
// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
return originalPush.call(this , location).catch(err => err)
}
// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
return originalReplace.call(this , location).catch(err => err)
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
				component: FacultyInfo,
				meta:{ menuIndex: '1' }
			},
			{
				name: 'teachingTask',
				path: 'teachingTask',
				component: TeachingTask,
				meta:{ menuIndex: '2' }
			},
			{
				name: 'prizeRecord',
				path: 'prizeRecord',
				component: PrizeRecord,
				meta:{ menuIndex: '3' }
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
				name: 'queryRank',
				path: 'queryRank',
				component: QueryRank,
				meta:{ menuIndex: '4' }
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
	// console.log(from)
	// console.log(to)
	// console.log('----------------------------')
	isAuthenticated = window.localStorage.isAuthenticated === 'true'
	if (
		// 检查用户是否已登录
		!isAuthenticated &&
		//  避免无限重定向
		to.name !== 'login'
	) next({ name: 'login' })
	// 将用户重定向到登录页面
	else {
		//if (to.path === from.path) { console.log('不要重复跳转'); return }
		next() 
	}
})

export default router
