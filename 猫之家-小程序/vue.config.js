const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {

	chainWebpack: (config) => {
		config.resolve.alias // 添加别名
			.set('mock', resolve('mock'))
	},
	devServer: {
		"proxy": {
			"/api": {
				"target": "http://v.juhe.cn",
				"changeOrigin": true, //是否跨域
				"pathRewrite": {
					"^/api": ""
				}
			}
		}
	}
}
