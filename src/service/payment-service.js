/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-11 18:37:10 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-11 19:38:56
 */
var tool = require('util/tool.js');

var _payment = {
    // 获取支付信息  
    getPaymentInfo: function(orderNumber, resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/order/pay.do'),
            data    : {
                orderNo: orderNumber
            },
            success : resolve,
            error   : reject
        });
    } 
};

module.exports  = _payment;