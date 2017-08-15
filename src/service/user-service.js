var tool = require('util/tool.js');

var _user = {
    //用户登录
    login: function(userInfo, resolve, reject){
        tool.request({
            url: tool.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查用户名是否存在
    checkUsername: function(userName, resolve, reject){
        tool.request({
            url: tool.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'userName',
                str: userName
            }, 
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 用户注册
    register: function(userInfo, resolve, reject){
        tool.request({
            url: tool.getServerUrl('/user/register.do'),
            data: userInfo, 
            method: 'POST',
            success: resolve,
            error: reject
        }); 
    },
    // 检查登录状态
    checkLogin: function(resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 退出登录
    logout : function(resolve, reject){
        tool.request({
            url     : tool.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _user;