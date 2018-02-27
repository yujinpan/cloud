// 常量
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

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
                test: /(\.ttf|\.woff2|\.woff|\.eot|\.svg|\.dtd)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        name: '[hash:6].[ext]'
                    }
                }
            }
        ]
    },

    // 插件
    plugins: [
        // 清理打包目录
        new CleanWebpackPlugin(['dist/**/**'], {
            root: __dirname
        }),
        // 生成入口模板
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
};