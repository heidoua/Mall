/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-10 17:23:18 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-10 17:26:12
 */
require("./index.css");
var tool = require("util/tool.js");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var templateIndex = require("./index.string");
var _cart = require("service/cart-service.js"); 

var page = {
    data: {
         
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){ 
        this.loadCart(); 
    },
    bindEvent: function(){   
        var _this = this;
    },
    // 加载购物车信息  
    loadCart: function(){
        
    }
};

$(function(){
    page.init();
});