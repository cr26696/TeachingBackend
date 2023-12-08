import router from "@/router";
import axios from "axios";
import JSONbig from "json-bigint";
//import { Message } from 'element-ui';

const instance = axios.create({
	//baseURL: "http://49.235.106.165:8088/teaching-evaluation-system",
	baseURL: "http://localhost:8080/apis",
	timeout: 5000,
	transformResponse: [
		function(data) {
			const json = JSONbig({
				storeAsString: true,
			});
			const res = json.parse(data);
			return res;
		},
	],
});
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem("satoken");
    // 定义允许无需 token 的接口路径（根据你的需求自定义）
    const allowedPaths = ['/auth/login','/test'];
    if (token || allowedPaths.includes(config.url)) {
      // 如果 token 存在或者请求的路径在允许列表中，将 token 添加到请求头中
      if (token) {
        config.headers.satoken = token;
        // console.log(config)
      }
      return config; // 继续请求
    } else {
			router.push({ name: 'login' });
			//  Message.error("已下线,请重新登录");
			return Promise.reject(new Error('Token is missing')); // 可以根据需求自定义错误信息
    }
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log("状态响应:",response)
    // console.log("状态响应message:",response.data.msg)
    // console.log("状态响应code:",response.data.code)
    // 如果响应状态码为 401（或者其他表示 token 失效的状态码），执行跳转到登录页面
    // if (response.status === 200) {
    // if (response.data.code === 2001) {
    // if (response.data.message.includes("token")) {
    //   // 在这里可以进行其他处理，例如清除本地存储中的 token，重置用户状态等
    //     // 清除token
    //   console.log("要退出了")
    //   window.localStorage.removeItem("token");
    //   // console.log(response.data.message," Message.error(response.data.message);")
    //     // 使用Element UI的Message方法显示错误消息
    //   Message.error("已下线,请重新登录");
    //   // this.$message.error(response.data.message)
    //   // 跳转到登录页面
    //   router.push({ name: 'login' });
    // }

    // 其他情况，直接返回响应
    return response;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

export default instance;
