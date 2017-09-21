/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-08 09:30:09 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-21 14:08:38
 */
var tool = require('util/tool.js');

var _product = {
    //用户登录
    getProductList: function(listParam, resolve, reject){
        tool.request({
            url: tool.getServerUrl('/product/list.do'),
            data: listParam,
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;