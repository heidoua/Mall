/*
 * @Author: FangFeiyue 
 * @Date: 2017-08-15 15:40:25 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-08-15 16:08:08
 */

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
        // 验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            // 如果用户名为空，不做验证
            if (!username){
                return '';
            }
            // 异步验证用户名是否存在
            _user.checkUsername(username, function(res){
                formError.hidde();               
            }, function(errMsg){
                formError.show(errMsg);
            }); 
        });
        //注册按钮的点击
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
             passwordConfirm : $.trim ($('#password-confirm').val()),
             phone: $.trim($('#phone').val()),      
             email: $.trim($('#email').val()),    
             question : $.trim($('#question').val()),      
             answer: $.trim($('#answer').val())    
        }, 
        // 表单验证结果
        validateResult = this.formValidate(formData);

        // 验证成功
        if (validateResult.status){
            //  提交
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
                 
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

        if (formData.password.length < 6){
            result.msg = '密码长度不能少于6位';
            return result;
        }

        // 两次输入的密码是否一致
        if (formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }

        // 验证手机号
        if (!tool.validate(formData.phone, 'phone')){
            result.msg = '手机格式不正确'; 
            return result;
        }

        // 验证邮箱
        if (!tool.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确'; 
            return result;
        }

        // 验证密码提示问题
        if (!tool.validate(formData.question, 'question')){
            result.msg = '密码提示问题不能为空'; 
            return result;
        }

        // 验证密码答案 
        if (!tool.validate(formData.answer, 'answer')){
            result.msg = '密码提示问题的答案不能为空'; 
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