import request from '@/utils/request';

//获取课程列表 传入form Object data
export const getCourseList = data => {
	return request({
		method: 'post',
		url: '/course/list',
		data
	})
}

//获取成果列表 传入form Object data
export const getAchieveList = data => {
	return request({
		method: 'post',
		url: '/achievement/list',
		data
		// data: {
		// 	"curPage": data.curPage,
		// 	"pageSize": data.pageSize,
		// 	"startTime": data.startTime,
		// 	"endTime": data.endTime,
		// 	"state": data.state,
		// 	"isLandmark": data.isLandmark,
		// 	"input": data.input,
		// 	"currentStaffNum": data.currentStaffNum
		// }
	})
}
//获取成果单项 传入 num id
export const getAchieveByID = id => {
	return request({
		method: 'get',
		url: '/achievement/get_achievement',
		params: {
			id
		}
	})
}
//管理员打分 传入form Object data
export const achieveJudge = data => {
	return request({
		method: 'post',
		url: '/achievement/score',
		data
		// data: {
		// 	"id": 0,
		// 	"achievementAttribute": "string",
		// 	"awardGrade": 0,
		// 	"isLandmark": "string",
		// 	"isLandmarkScores": 0,
		// 	"score": 0,
		// 	"callBackReason": "string",
		// 	"state": "string"
		// }
	})
}
//删除成果 传入目标数组 Array ids
export const achieveDelete = ids => {
	return request({
		method: 'post',
		url: '/achievement/delete',
		data:{
			ids
		}
		// {
		// 	"ids": [
		// 		0
		// 	],
		// 	"uuids": [
		// 		"string"
		// 	]
		// }
	})
}

export const getRankList = data => {
	return request({
		method: 'post',
		url: '/rank/list',
		data
	})
}
