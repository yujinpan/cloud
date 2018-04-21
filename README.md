[TOC]

# webpack环境搭建


## 安装与配置webpack

### 1. 安装webpack
```
# 全局安装
$ cnpm install -g webpack@3.11

# 本地安装
$ cnpm install --save-dev webpack@3.11
```

### 2. 新建入口文件
```
// ./index.js
alert('Hello world!');
```

### 3. 新建配置文件
```
// ./webpack.config.js
module.exports = {

    // 入口文件
    entry: __dirname + '/index.js',
    
    // 开发模式记录错误信息
    devtool: 'inline-source-map',
    
    // 输出文件
    output: {
        path: __dirname + '/dist',
        filename: 'bundle-[hash].js'
    }

};
```

### 4. 运行测试
```
$ webpack

Hash: 7ac8e5097f8728f373f3
Version: webpack 3.10.0
Time: 83ms
                         Asset    Size  Chunks             Chunk Names
bundle-7ac8e5097f8728f373f3.js  2.5 kB       0  [emitted]  main
   [0] ./index.js 22 bytes {0} [built]
```


## 安装常用插件

### 1. 安装自动清理打包目录的插件
```
$ cnpm install --save-dev clean-webpack-plugin

// ./webpack.config.js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    ...
    // 加载模块
    plugins: [
        new CleanWebpackPlugin(['dist/**/**'], {
            root: __dirname
        })
    ]
};
```

### 2. 安装自动生成模板插件
```
$ cnpm install --save-dev html-webpack-plugin

// ./webpack.config.js
...
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    // 加载模块
    plugins: [
        ...
        new HtmlWebpackPlugin()
    ]
};
```

### 3. 新建入口默认模板
```
// ./index.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
</head>
<body>
</body>
</html>

// ./webpack.config.js
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: __dirname + '/index.html'
})
```

### 4. 安装webpack开发服务器及依赖
```
$ cnpm install --save-dev webpack-dev-server webpack-cli

// ./webpack.config.js
...
module.exports = {
    ...
    devServer: {
        // 服务器文件路径
        contentBase: './dist',
        // 不跳转url
        historyApiFallback: true,
        // inline模式url不用变化
        inline: ture,
        // 热更新
        hot: true,
        // 开启GZIP
        compress: true,
    }
    ...
}

// ./package.json
"scripts": {
    ...
    "start": "webpack-dev-server --open"
}
```

### 5. 运行测试
```
$ npm start
// 浏览器弹出‘Hello world!’测试成功
```

### 6. 整理项目目录
> 新建app文件夹，将`index.js`，`index.html`整理在里面，修改`webpack.config.js`:

```
// ./webpack.config.js
// 常量
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    // 入口
    entry: __dirname + '/app/index.js',

    // 输出
    output: {
        path: __dirname + '/dist',
        filename: 'bundle-[hash].js'
    },

    // server
    devServer: {
        contentBase: __dirname + '/dist',
    },

    // 插件
    plugins: [
        new CleanWebpackPlugin(['dist/**/**'], {
            root: __dirname
        }),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
    ]
};
```

## 安装常用加载器

### 1. 安装样式加载模块
```
$ cnpm install --save-dev style-loader css-loader less-loader less

// ./webpack.config.js
module.exports = {

    ...

    // 模块
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },

    ...
};
```

### 2. 将样式文件打包为单个文件
```
cnpm install --save-dev extract-text-webpack-plugin

// ./webpack.config.js
// 常量
...
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {

    ...
    // 模块
    module: {
        rules: [
            {
                test: /\.less$/,
                // 打包为单独文件
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },

    // 插件
    plugins: [
        ...
        new ExtractTextWebpackPlugin('style.css')
    ]
};
```

### 3. 安装babel转译es6为es5
```
cnpm install babel-loader babel-core babel-preset-es2015 webpack` 

// ./webpack.config.js
// 常量
module.exports = {
    ...
    // 模块
    module: {
        rules: [
            ...
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-es2015']
                    }
                }
            }
        ]
    },
    ...
};
```

### 4. 压缩代码
```
// 压缩js
// ./webpack.config.js
plugins: [
    ...
    new webpack.optimize.UglifyJsPlugin()
]

// 压缩css
// ./webpack.config.js
module: {
    rules: [
        {
            test: /\.less$/,
            // 打包为单独文件，minimize压缩代码
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: [
                    { loader: 'css-loader', options: { minimize: true } },
                    { loader: 'less-loader' }
                ],
            })
        },
    ]
}
```

# 模块化项目结构

## 模块化第三方库

### 1. 安装第三方库
```
cnpm install --save angular @uirouter/angularjs bootstrap angular-ui-bootstrap` 
```

### 2. 配置第三方样式文件单独打包
```
// ./app/index.js
import 'bootstrap/dist/css/bootstrap.css';

// ./webpack.config.js
// 常量
...
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// 第三方引入css
var BaseCss = new ExtractTextWebpackPlugin('base.min.css');
var AppCss = new ExtractTextWebpackPlugin('app-[hash].css');

module.exports = {

    ...

    // 模块
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                // 打包为单独文件
                use: BaseCss.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                        { loader: 'less-loader' }
                    ],
                })
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: AppCss.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                    ]
                })
            },
            ...
        ]
    },

    // 插件
    plugins: [
        ...
        BaseCss, AppCss
    ]
};
```
### 3. 安装文件加载器
```
cnpm install --save-dev file-loader

// ./webpack.config.js
module: {
    rules: [
        ...
        {
            test: /(\.ttf|\.woff2|\.woff|\.eot|\.svg|\.dtd)/,
            use: {
                loader: 'file-loader'
            }
        }
    ]
},
```
### 4. 整理样式目录

> 将css文件放入dist/css中，将字体文件放入dist/font中，这里修改了output里面的publicPath，css文件路径，字体文件路径都会读取这个路径

```
// ./webpack.config.js
...
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// 第三方引入css
var BaseCss = new ExtractTextWebpackPlugin('css/base.min.css');
var AppCss = new ExtractTextWebpackPlugin('css/app-[hash].css');

module.exports = {

    ...

    // 输出
    output: {
        path: __dirname + '/dist',
        filename: 'bundle-[hash].js',
        publicPath: '/'
    },

    ...

    // 模块
    module: {
        rules: [
            ...
            {
                test: /(\.ttf|\.woff2|\.woff|\.eot|\.svg|\.dtd)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/'
                    }
                }
            }
        ]
    },
    ...
};
```
> `$ webpack` 查看打包后台的目录是否正确，`$ npm start` 查看服务器上路径是否引用正确

### 5. 打包第三方js库

> 提取公共js库至单独文件

```
// ./app/index.js
import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import uibootstrap from 'angular-ui-bootstrap';

// ./webpack.config.js
...

module.exports = {

    // 入口
    entry: {
        vendor: ['angular', '@uirouter/angularjs', 'angular-ui-bootstrap'],
        app: __dirname + '/app/index.js'
    },

    ...

    // 插件
    plugins: [
        ...
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            // 对应的entry数组vendor
            name: 'vendor',
            filename: 'js/vendor.min.js',
            // 保证没有其他模块打包进该模块
            minChunks: Infinity
        })
    ]
};
```


## 优化缓存和配置

### 1. 优化文件hash更新

> js文件使用[chunkhash:6]，css文件使用[contenthash:6]，字体文件使用[hash:6]。

```
...
// 第三方引入css
var BaseCss = new ExtractTextWebpackPlugin('css/base-[contenthash:6].css');
var AppCss = new ExtractTextWebpackPlugin('css/app-[contenthash:6].css');

module.exports = {

    ...

    // 输出
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name]-[chunkhash:6].js',
        publicPath: '/'
    },

    ...

    // 模块
    module: {
        rules: [
            ...
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
        ...
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
```
### 2. 新建开发模式和生产模式

> 开发模式webpack.dev.js需要快速响应文件变化，打印错误信息；生产模式webpack.prod.js需要压缩代码，优化体积。

```
$ cnpm install --save-dev webpack-merge
```

> webpack.common.js 公共配置

```
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
```

> webpack.dev.js 开发模式

```
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
```

> webpack.prod.js 生产模式

```
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// 第三方引入css
var BaseCss = new ExtractTextWebpackPlugin('css/base-[contenthash:6].css');
var AppCss = new ExtractTextWebpackPlugin('css/app-[contenthash:6].css');

module.exports = merge(common, {
    // 入口
    entry: {
        vendor: ['angular', '@uirouter/angularjs', 'angular-ui-bootstrap'],
        app: __dirname + '/app/index.js'
    },

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
        // css模块
        BaseCss, AppCss,
        // 压缩js文件
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            // 对应的entry数组vendor
            name: 'vendor',
            filename: 'js/vendor-[chunkhash:6].js',
            // 保证没有其他模块打包进该模块
            minChunks: Infinity
        }),
        // 设置node生产环境变量进行代码优化
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
```

