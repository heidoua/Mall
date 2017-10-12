/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-12 11:20:09 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-12 18:46:57
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
            url     : tool.getServerUrl('/order/create.do'),
            data: orderInfo,
            success : resolve,
            error   : reject
        });
    },
};

module.exports  = _order;