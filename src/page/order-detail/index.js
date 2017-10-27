/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-27 18:06:13 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-27 18:13:51
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var tool          = require('util/tool.js'),
    _order        = require('service/order-service.js'),
    navSide       = require('page/common/nav-side/index.js'),
    templateIndex = require('./index.string');

//page逻辑部分
var page = {
    data: {
        orderNumber: tool.getUrlParam('orderNumber')    
    },
   init:  function(){
       //初始化左侧菜单
       navSide.init({
           name: 'order-list'
       });
       // 加载用户信息
       this.onLoad();
       this.bindEvent();     
   }, 
   bindEvent: function(){
       
   },
   onLoad: function(){
       this.loadDetail();

   },
    //    加载订单列表
   loadDetail: function(){
        var _this           = this,
            $content        = $('.content'),
            orderDetailHtml = '';
            
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function(res){
            // 渲染html
            orderDetailHtml = tool.renderHtml(templateIndex, res);
            $content.html(orderListHtml);
        }, function(errMsg){
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
   }
}; 

$(function(){
   page.init();
}); 