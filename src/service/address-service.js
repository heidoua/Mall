/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-12 17:13:37 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-26 14:13:52
 */
var tool = require('util/tool.js');

var _address = {
   // 获取地址列表
   getAddressList : function(resolve, reject){
       tool.request({ 
           url     : tool.getServerUrl('/shipping/list.do'),
           data    : {
               pageSize: 50
           },
           success : resolve,
           error   : reject
       });
   },
   //    新建收件人
   save: function(addressInfo, resolve, reject){
        tool.request({
            url    : tool.getServerUrl('/shipping/add.do'),
            data   : addressInfo,
            success: resolve,
            error  : reject
        });       
   },
    // 更新收件人信息   
   update: function(addressInfo, reslove, reject){
        tool.request({
            url: tool.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: reslove,
            error: reject
        });
   },
    // 获取单条收件地址   
   getAddress: function(shippingId, resolve, reject){
        tool.request({
            url: tool.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });     
   }
};

module.exports  = _address;