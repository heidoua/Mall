/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-22 14:46:10 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-22 15:08:23
 */
require("./index.css");
var tool = require("util/tool.js");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var templateIndex = require("./index.string");
// var Pagination = require('util/pagination/index.js');
var _product = require("service/product-service.js");

var page = {
    data: {
        productId: tool.getUrlParam('productId') || ''
    },
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        // 如果没有productId则自动跳转回首页
        if(!this.data.productId){
            tool.goHome();
        }
        this.loadDetail(); 
    },
    bindEvent: function(){   
    },
    // 加载商品详情数据 
    loadDetail: function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        // loading   why 
        $pageWrap.html('<div class="loading"></div>');

        // 请求detail信息  
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            html = tool.renderHtml(templateIndex, res);
            console.log('html====>', html);
            $pageWrap.html(html);     
        }, function(errMsg) { 
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>'); 
        });
    },
    // 数据匹配 
    filter: function(data){
         data.subImages = data.subImages.split(',');
    }
};

$(function(){
    page.init();
});