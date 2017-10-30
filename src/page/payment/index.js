/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-11 18:29:21 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-11 19:16:43
 */
require("./index.css");
require("page/common/header/index.js");
var tool          = require("util/tool.js");
var templateIndex = require("./index.string");
var _payment      = require("service/payment-service.js");
var nav           = require("page/common/nav/index.js");

var page = {
    data:{ 
        orderNumber: tool.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        this.loadPaymentInfo();
    },
    loadPaymentInfo: function(){
        console.log('zhifubao');
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res){
            paymentHtml = tool.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            // 监听订单状态
            _this.listenOrderStatus();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    // 监听订单状态
    listenOrderStatus: function(){
        var _this = this;
        this.paymentTime = window.setInterval(function(){
            _payment.getPaymentStatus(_this.orderNumber, function(res){
                if (res == true){
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            }, function(errMsg){

            });
        }, 5e3);
    }
};

$(function(){
    page.init();
});