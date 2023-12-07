import request from '@/utils/request';

//登录接口 传入form
export const login = data => {
	return request({
		method: 'post',
		url: '/auth/login',
		data: {
			accountNo:data.accountNo, //账号
			password:data.password, //密码
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
