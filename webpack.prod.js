const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// 第三方引入css
var BaseCss = new ExtractTextWebpackPlugin('css/base-[contenthash:6].css');
var AppCss = new ExtractTextWebpackPlugin('css/app-[contenthash:6].css');

module.exports = merge(common, {

    // 用于生产环境错误信息日志
    devtool: 'source-map',

    // 模块
    module: {
        rules: [
            // less加载器，为app自定义文件
            {
                test: /\.less$/,
                exclude: /node_modules/,
                // 打包为单独文件
                use: AppCss.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                        { loader: 'less-loader' }
                    ],
                })
            },
            // css加载器，这里是对第三方库进行单独打包
            {
                test: /\.css$/,
                include: /node_modules/,
                use: BaseCss.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                    ]
                })
            }
        ]
    },

    // 插件
    plugins: [
        // 清理打包目录
        new CleanWebpackPlugin(['dist/**/**'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        // css模块
        BaseCss, AppCss,
        // 压缩js文件
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        // 设置node生产环境变量进行代码优化
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});