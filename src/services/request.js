import request from '@/utils/request';

//登录接口 传入form
export const getAchieveList = data => {
	return request({
		method: 'post',
		url: '/achievement/list',
		data: {
			"curPage": data.curPage,
			"pageSize": data.pageSize,
			"startTime": data.startTime,
			"endTime": data.endTime,
			"state": data.state,
			"isLandmark": data.isLandmark,
			"input": data.input,
			"currentStaffNum": data.currentStaffNum
		}
	})
}
export const getAchieveByID = id => {
	return request({
		method: 'get',
		url: '/achievement/get_achievement',
		params: {
			id
		}
	})
}
//登出接口
export const logout = data => {
	return request({
		method: 'post',
		url: '/auth/logout',
	})
}
