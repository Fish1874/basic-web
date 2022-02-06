const { merge } = require('webpack-merge');
const commonConfig = require("./webpack.common.js");

const prodConfig = {
    mode: "production",
    devtool: 'eval-cheap-module-source-map',
    optimization: {
        usedExports: true, // 识别无用代码
        minimize: true,    // 将无用代码在打包中删除
        /*
         *  用于在package.json里面配置 "sideEffects",
         * 主要用途是告诉webpack哪些文件是不需要tree-shaking, 跳过此文件。
         */
        // sideEffects: true, // 开启副作用标识功能
    }
}

module.exports = merge(commonConfig, prodConfig)
