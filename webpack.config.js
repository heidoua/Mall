/*
 * @Author: FangFeiyue 
 * @Date: 2017-08-10 17:39:51 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-22 15:17:40
 */
/*对脚本的处理
1.js用什么loader加载
2.官方文档上的列子中entry只有一个js，我们有多个该怎么办
3.output里要分文件夹存放目标文件，怎么设置
4.jquery引入方法
5.提取公共模块，怎么处理？

对样式的处理
1.样式使用怎样的loader
2.webpack打包的css怎么独立成单独的文件
3.
*/

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//环境变量的配置：分为dev和online
var WEBPACK_EVN = process.env.WEBPACK_EVN || 'dev';

console.log(WEBPACK_EVN); 

var getHtmlConfig = function(name, title){
     return {
        title: title,
        filename: 'view/' + name + '.html',
        template: './src/view/' + name + '.html',
        inject: true,//true默认值，script标签位于html文件的;  body 底部。body同true;   head script 标签位于 head 标签内; false 不插入生成的 js 文件，只是单纯的生成一个 html 文件
        hash: true,
        chunks: ['common', name]
     };
}

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail ': ['./src/page/detail/index.js'],
        'common': ['./src/page/common/index.js'],
        'result': ['./src/page/result/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
    },
    output: {
        path: './dist',//存放文件的一个路径
        publicPath: '/dist',//访问文件时的一个路径
        filename: 'js/[name].js'
    },
    externals: {//可以把外部的变量或者模块加载进来
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [{
                test:/\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader")   
            },{
                test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            },{
                test:/\.string$/,
                loader: 'html-loader'
            }
        ]
    },
    //配置别名
    resolve: {
        alias: {
            util: __dirname + '/src/util',//__dirname表示当前根目录
            node_modules: __dirname + '/node_modules',//为了获取字体
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    plugins: [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name:  'common',
            filename: 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息'))
    ]
};

if ("dev" === WEBPACK_EVN){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;