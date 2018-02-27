// 常量
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // 入口
    entry: {
        app: __dirname + '/app/index.js'
    },

    // 开发模式记录错误信息
    devtool: 'inline-source-map',

    // server
    devServer: {
        contentBase: __dirname + '/dist',
    },

    // 模块
    module: {
        rules: [
            // less,css加载器，为app自定义文件
            {
                test: /(\.less|\.css)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
        ]
    }

});