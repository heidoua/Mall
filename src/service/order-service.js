/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-12 11:20:09 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-12 11:21:04
 */
var tool = require('util/tool.js');
 
var _order = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    }
};

module.exports  = _order;