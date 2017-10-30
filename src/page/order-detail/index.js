/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-27 18:06:13 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-27 19:03:31
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
       // 取消订单
       this.cancelOrder(this);
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
            _this.dataFilter(res);
            // 渲染html
            orderDetailHtml = tool.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg){
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
   },
   // 数据的适配
   dataFilter: function(data){
        // 10表示提交了订单并且在支付以前 
        data.needPay      = data.status === 10;
        data.isCancelable = data.status === 10;
   },
    // 取消订单
   cancelOrder: function(_this){
        $(document).on('click', '.order-cancel', function(){
            if (window.confirm('确实要取消该订单吗?')){
                _order.cancelOrder(_this.data.orderNumber, function(res){
                    too.successTips('该订单取消成功!');
                    _this.loadDetail();
                }, function(errMsg){
                    tool.errorTips(errMsg);
                });
            }
        });
   }
}; 

$(function(){
   page.init();
}); 