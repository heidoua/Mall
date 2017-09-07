console.log('hello index ');

//这样写是有问题的，原因是1.每个文件都要引入jquery；2.有的插件依赖的是全局的jq对象，这样写是无法使用的
//$('body').html('我是放在index.html文件中的jqsdsd萨达地方');
require('../module.js');
require('./index.css');






var tool = require('util/tool.js');

//测试网络请求
// tool.request({
//     url: '/movie/list.json?type=hot&offset=0&limit=1000',
//     success: function(res){
//         console.log(res);
//     },
//     error: function(error){
//         console.log(error);
//     }
// });



//测试获取url参数
//  console.log(tool.getUrlParam('param'));



//测试模板渲染
//  var data = {
//      data: 'test'
//  };
//  var html = '<div>{{ data }}</div>';
//  console.log(tool.renderHtml(html, data));

require('./index.css');
require('util/slider/index.js');
var templateBanner = require('./banner.string');
//测试nav-simple
require('page/common/nav-simple/index.js');
//测试nav
require('page/common/nav/index.js');
//测试header
require('page/common/header/index.js');
//测试nav-side
var navSide = require('page/common/nav-side/index.js');

navSide.init({
    name: 'order-list'
});

// unslider初始化
$(function() {
    // 渲染banner的html
    var  bannerHtml = tool.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots: true  
    }); 
    // 前一张后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward  =  $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});

