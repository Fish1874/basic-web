const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir = '') {
    return path.resolve(__dirname, dir)
}

module.exports = {
    entry: {
        index: resolve('../src/index.js')
    }, // 工程资源入口
    output: {
        filename: "[name].[contenthash].js",
        path: resolve('../dist'),
        clean: true, // 在生成文件之前清空 output 目录
        // publicPath: 'https://www.baidu.com/', //拼接域名到 js路径前面： <script src="https://www.baidu.com/main.js">
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('../src')
        }
    },
    // loader
    module: {
        rules: [
            {
                test: /\.(css)|(s[ac]ss)$/,
                // loader加载顺序：「从右到做」「从下到上」
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    {// 将 CSS 转化成 CommonJS 模块
                        loader: "css-loader",
                        options: {
                            // modules: true, // 开启css模块化打包
                            importLoaders: 2, // 通过import引入的文件，引入之前也要执行下面两个loader
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env'
                                    ]
                                ],
                            }
                        }
                    },
                    "sass-loader"// 将 Sass 编译成 CSS
                ],
            },
            /* 在webpack5中，「asset module」代替以前的 url-loader、file-loader、raw-loader
             * https://webpack.docschina.org/guides/asset-modules/
             **/
            { // 打包图片
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]' // 自定义输出文件名
                }
            },
            { // 打包字体文件
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[hash][ext][query]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/, // 忽略node——modules文件里面js代码
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true, // 是否需要将编译的结果做缓存
                        babelrc: false,  // 不需要去.babelrc 寻找匹配规则

                        // ['preset名字', {配置项}] 👇我们将规则写在这里
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage' // 只打包有用到es6变量
                                }
                            ],
                            "@babel/preset-react"
                        ]
                    },
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html'
        })
    ],

    optimization: {
        splitChunks: { // 将公共的依赖模块提取到一个新的chunk中
            chunks: 'all',
            minChunks: 2,
        },
    }
}
