/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-08 09:30:09 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-08 09:32:17
 */
var tool = require('util/tool.js');

var _product = {
    //用户登录
    login: function(userInfo, resolve, reject){
        tool.request({
            url: tool.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;