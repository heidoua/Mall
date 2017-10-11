/*
 * @Author: FangFeiyue 
 * @Date: 2017-08-15 18:00:53 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-11 10:02:52
 */
var tool = require('util/tool.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加购物车 
    addToCart : function(productInfo, resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/cart/add.do'),
            data:  productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取购物车列表 
    getCartList : function(resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 选择购物车商品 
    selectProduct : function(productId, resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/cart/select.do'),
            data: {
                productId: productId 
            }, 
            success : resolve,
            error   : reject
        });
    },
    // 取消选择购物车商品 
    unselectProduct : function(productId, resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId 
            }, 
            success : resolve,
            error   : reject
        });
    },
    // 全选 
    selectAllProduct : function(resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消全选 
    unselectAllProduct : function(resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
};

module.exports  = _cart;