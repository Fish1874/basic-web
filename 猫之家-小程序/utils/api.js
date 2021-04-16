// const BASE_URL = 'http://v.juhe.cn'
// const BASE_URL = '/api'
var BASE_URL;
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    BASE_URL = '/api'
}else{
    // 生产环境
    BASE_URL = 'http://v.juhe.cn'
}

export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if(res.data.status !== 0) {
					return uni.showToast({
						title: '获取数据失败！'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败！'
				})
				reject(err)
			}
		})
	})
}