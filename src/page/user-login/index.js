/*
 * @Author: FangFeiyue 
 * @Date: 2017-08-15 14:41:04 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-08-15 15:26:12
 */

// console.log('hello login');
// require('../module.js');
// require('./login.css');



require('./index.css');
require('page/common/nav-simple/index.js');
var tool = require('util/tool.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
    show: function(errMsg){
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hidde: function(){
        $('.error-item').hidde().find('.error-msg').text('');
    }     
};

//page逻辑部分
var page = {
    init:  function(){
        this.bindEvent();    
    },
    bindEvent: function(){
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });    

        // 如果按下回车也进行提交
        $('.user-content').keyup(function(e){
            if (e.keyCode == 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit: function(){
        var formData = {
             username: $.trim($('#username').val()),    
             password: $.trim($('#password').val()),    
        },
        // 表单验证结果
        validateResult = this.formValidate(formData);

        // 验证成功
        if (validateResult.status){
            //  提交
            _user.login(formData, function(res){
                window.location.href = tool.getUrlParam('redirect') || './index.html';
                 
            }, function(errMsg){
                formError.show(errMsg);
            });
        }else{// 验证失败
            // 错误提示
            formError.show(validateResult.msg);
        }
    },
    // 表单的验证字段
    formValidate: function(formData){
         var result = {
              status: false,
              msg: ''
         };

         if (!tool.validate(formData.username, 'require')){
             result.msg = '用户名不能为空'; 
             return result;
         }

         if (!tool.validate(formData.password, 'require')){
            result.msg = '密码不能为空'; 
            return result;
        }

        //通过验证，返回正确提示
         result.status = true;
         result.msg = '验证成功';
         return result;
    }
}; 

$(function(){
    page.init();
});