import request from '@/utils/request';

//上传文件 传入file
export const uploadFile = file => {
	return request({
		method: 'post',
		url: '/file/upload',
		data:{
			file
		}
	})
}
//根据fileKey获取下载地址 传入fileKey
export const getFileByFileKey = fileKey => {
	return request({
		method: 'get',
		url: '/file/download_url',
		params:{
			fileKey
		}
	})
}
//根据fileKey列表获取下载地址列 传入fileKeyList
export const getFilesByKeyList = fileKeyList => {
	return request({
		method: 'post',
		url: '/file/download_urls',
		params:{
			fileKeyList
		}
	})
}
//(实际)文件下载接口 传入object Form{时间+filename}
export const downloadByTime = form => {
	return request({
		method: 'get',
		url: `/file/download/${form.year}/${form.month}/${form.day}/${form.hour}/${form.fileName}:.+`,
	})
}
//fileKey下载文件 传入fileKey
export const downloadByFileKey = fileKey => {
	return request({
		method: 'get',
		url: '/file/download/by_file_key',
		params:{
			fileKey
		}
	})
}
//fileKeys批量下载文件 传入fileKeys
export const downloadByFileKeys = fileKeys => {
	return request({
		method: 'post',
		url: '/file/download/by_file_key_list',
		params:{
			fileKeys
		}
	})
}
