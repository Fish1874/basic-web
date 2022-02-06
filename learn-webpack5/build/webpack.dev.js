const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// 结合开发环境配置和基础配置
const devConfig = {
    mode: "development",
    devtool: 'eval-cheap-source-map', // 跟踪错误路径
    devServer: {
        hot: true, // 启动HMR
        port: 8888,
        open: true,
        proxy: { // 设置反向代理
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api': ''}, // 将/api 替换为空
            },
        },
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ]
}

module.exports = merge(commonConfig, devConfig)
