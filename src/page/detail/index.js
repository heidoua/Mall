/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-22 14:46:10 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-22 15:08:23
 */
require("./index.c ss");
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

    },
    onLoad: function(){
        
    },
    bindEvent: function(){
        // 如果没有productId则自动跳转回首页
        if(!this.data.productId){
            tool.goHome();
        }
        this.loadDetail ();    
    },
    // 加载商品详情数据 
    loadDetail: function(){
        var html = '';
        _product.getProductDetail(this.data.productId, function(res){
            html = tool.renderHtml(templateIndex, res);
            $('.page-wrap').html(html);     
        }, function(errMsg) {
            $('.page-wrap').html('<p class="err-tip">此商品太淘气，找不到了</p>'); 
        });
    }
};