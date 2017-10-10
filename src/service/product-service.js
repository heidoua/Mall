/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-08 09:30:09 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-21 15:41:51
 */
var tool = require('util/tool.js');

var _product = {
    //用户登录
    getProductList: function(listParam, resolve, reject){
        tool.request({
            url: tool.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 获取商品详细信息  
    getProductDetail:  function(productId, resolve, reject){
        tool.request({
            url: tool.getServerUrl('/product/detail.do'),
            data: {
                  productId: productId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;