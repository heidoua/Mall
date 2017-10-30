/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-12 11:20:09 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-27 18:21:08
 */
 
var tool = require('util/tool.js');
 
var _order = {
    // 获取订单列表
    getProductList : function(resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    } ,
    // 提交订单
    createOrder: function(orderInfo, resolve, reject){
        tool.request({
            url    : tool.getServerUrl('/order/create.do'),
            data   : orderInfo,
            success: resolve,
            error  : reject
        });
    },
    // 获取订单列表
    getOrderList: function(listParam, resolve, reject){
        tool.request({
            url    : tool.getServerUrl('/order/list.do'),
            data   : listParam,
            success: resolve,
            error  : reject
        });
    },
    // 获取订单详情
    getOrderDetail: function(orderNumber, resolve, reject){
        tool.request({
            url    : tool.getServerUrl('/order/detail.do'),
            data   : {orderNo: orderNumber}, 
            success: resolve,
            error  : reject
        });
    },
    // 取消订单
    cancelOrder: function(orderNumber, resolve, reject){
        tool.request({
            url    : tool.getServerUrl('/order/cancel.do'),
            data   : {orderNo: orderNumber},
            success: resolve,
            error  : reject
        });
    }
};

module.exports  = _order;