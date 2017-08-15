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
    }
};

module.exports = _user;