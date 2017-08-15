/*
 * @Author: FangFeiyue 
 * @Date: 2017-08-15 18:00:53 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-08-15 18:09:19
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

};

module.exports  = _cart;