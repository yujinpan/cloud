// 常量
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: {
        vendor: ['angular', '@uirouter/angularjs', 'angular-ui-bootstrap'],
        app: __dirname + '/app/bootstrap/bootstrap.js'
    },

    // 输出
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name]-[chunkhash:6].js',
        publicPath: '/'
    },

    // 模块
    module: {
        rules: [
            // 转义es6为es5
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            // 加载字体文件
            {
                test: /(\.ttf|\.woff2|\.woff|\.eot|\.svg|\.dtd)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        name: '[hash:6].[ext]'
                    }
                }
            },
            // html转换为字符串
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },

    // 插件
    plugins: [
        // 生成入口模板
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            // 对应的entry数组vendor
            name: 'vendor',
            filename: 'js/vendor-[chunkhash:6].js',
            // 保证没有其他模块打包进该模块
            minChunks: Infinity
        })
    ]
};