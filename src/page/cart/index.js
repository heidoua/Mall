/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-10 17:23:18 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-11 10:35:25
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
        // 选择购物车商品或者取消选择购物车商品
        _this.selectOrUnSelectProduct(_this);
        // 全选或取消全选 
        _this.selectOrunSelectAllProducts(_this);
    },
    // 加载购物车信息  
    loadCart: function(){
        var _this = this;
        // 获取购物车列表 
        _cart.getCartList(function(res) {
            _this.renderCart(res); 
        }, function(errMsg) {
            _this.showCartError();
        });
    },
    // 渲染购物车
    renderCart: function(data){
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        var cartHtml = tool.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml); 
    },
    // 数据匹配
    filter: function(data){ 
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 显示错误信息 
    showCartError: function(){
        $('.page-wrap').html('<p>哪里不对了，刷新下试试</p>');
    },
    // 选择购物车商品或者取消选择购物车商品 
    selectOrUnSelectProduct: function(_this){
        // 商品的选择/取消选择
        $(document).on('click', '.cart-select', function() {
            var $this = $(this),
                $productId = $this.parents('.cart-table').data('product-id');
            // 选中
            if ($this.is(':checked')){
                _cart.selectProduct($productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }else{ // 取消选中
                _cart.unselectProduct($productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }     
        });
    },
    // 全选或取消全选
    selectOrunSelectAllProducts: function(_this){
        // 商品的全选/非全选
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this); 
            // 全选
            if ($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }else{ // 取消全选
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }     
        });
    }
};

$(function(){
    page.init();
});