export default {
	// 初始化数据
	config: {
		baseUrl: 'http://localhost:3000',
		header: {},
		data: {},
		method: '',
		dataType: '',
		responseType: 'text',
		success() {},
		fail() {},
		complete() {}
	},
	// 请求拦截
	interceptor: {
		request: null,
		response: null
	},
	// 响应内容
	request(options = {}) {
		let self = this;
			if (!options) {
				options = {}
			};
			options.baseUrl = options.baseUrl || this.config.baseUrl; //请求的ip
			options.dataType = options.dataType || this.config.dataType; //请求数据类型
			options.url = options.baseUrl + options.url; //请求url
			options.data = options.data || {}; //请求数据
			options.method = options.method || this.config.method; //请求方法
			return new Promise((resolve, reject) => {
				let _config = null
				//请求失败或成功都会触发
				options.complete = (response) => {
					// console.log(response)
					let statusCode = response.statusCode;
					response.config = _config;
					//请求后响应拦截
					if (this.interceptor.response) {
						let newResponse = this.interceptor.response(response)
						if (newResponse) {
							response = newResponse
						}
					}
					// 判断是否请求失败或成功
					if (statusCode === 200) { //成功
						resolve(response.data);
					} else {
						reject(response);
						//request:fail  --- 请求失败
						uni.showToast({
							icon: "none",
							title: "网络不给力,请重新操作~"
						})
					}
				}
	
				//对象拷贝 --- options 合并 初始config配置 并覆盖相同key
				_config = Object.assign({}, this.config, options);
				//添加请求时间戳
				// 触发请求拦截
				if (this.interceptor.request) {
					this.interceptor.request(_config)
				}
				/*统一的请求日志记录*/
				delete _config.isShow;
				// delete _config.isToken;
				delete _config.baseUrl;
				delete _config.formData;
				delete _config.name;
				global.requestTask = uni.request(_config);
			});
	}
}