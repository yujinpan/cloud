/**
 * webpack.config
 */

// 定义模式
const mode = 'development';

// 外部插件
// 清理输出目录
const cleanWebpackPlugin = require('clean-webpack-plugin');
// 生成入口模板，主要添加资源文件的引用
const htmlWebpackPlugin = require('html-webpack-plugin');
// 合并css，分隔第三方库
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const externalCss = new extractTextWebpackPlugin('css/external-[contenthash:6].css');
const appCss = new extractTextWebpackPlugin('css/app-[contenthash:6].css');

module.exports = (function webpackConfig() {
    var config = {};

    // 入口文件
    config.entry = {
        app: __dirname + '/app/bootstrap/bootstrap.js'
    };

    // 输出路径
    config.output = {
        path: __dirname + '/dist',
        filename: 'js/[name]-[chunkhash:6].js',
        publicPath: '/'
    };

    // module
    config.module = {
        // 加载文件的配置
        rules: [
            // 使用exclude与include区分第三方库样式
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: appCss.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader', 
                            // 启用css压缩
                            options: {
                                minimize: true
                            }
                        },{
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: externalCss.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader', 
                            // 启用css压缩
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            // 文件loader
            {
                test: /\.(ttf|woff2|woff|eot|svg|dtd|jpg|jpeg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        name: '[hash:6].[ext]'
                    }
                }]
            }
        ]
    };

    // 插件
    config.plugins = [
        new cleanWebpackPlugin(['dist/**/**'], {
            root: __dirname
        }),
        new htmlWebpackPlugin({
            template: __dirname + '/app/index.html'
        }),
        externalCss, appCss

    ];

    // 开发环境配置
    if (mode === 'development') {
        
        // 开发环境服务器配置
        config.devServer = {
            // 服务器文件路径
            contentBase: __dirname + '/dist'
        };

    }

    // 生产环境配置
    if (mode === 'production') {

    }

    return config;
})();