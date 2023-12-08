import request from '@/utils/request';

//字典接口 传入type
export const getDict = dictType => {
	return request({
		method: 'get',
		url: '/dict/query',
		params: {
			dictType: dictType
		}
	})
}
//全字典接口
export const getAllDict = dictType => {
	return request({
		method: 'get',
		url: '/dict/list'
	})
}
