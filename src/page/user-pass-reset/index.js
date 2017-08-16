/*
 * @Author: FangFeiyue 
 * @Date: 2017-08-16 09:06:08 
 * @Last Modified by:   FangFeiyue 
 * @Last Modified time: 2017-08-16 09:06:08 
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
        $('.error-item').hide().find('.error-msg').text('');
    }     
};

//page逻辑部分
var page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token : ''
    },
    init:  function(){
        this.onLoad();
        this.bindEvent();    
    },
    onLoad: function(){
        this.loadStepUsername();
    },
    bindEvent: function(){
        var _this = this;
        // 输入用户名后下一步按钮的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            // 输入了用户名
            if (username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username; 
                    _this.data.question = res;
                    _this.loadStepQuestion(); 
                }, function(errMsg){
                    formError.show(errMsg);
                }); 
            }else{// 没有输入用户名
                formError.show('请输入用户名');
            }
        });

        // 输入密码提示问题答案中的按钮的点击
        $('#submit-question ').click(function(){
            var answer  = $.trim($('#anwser').val());
            // 输入了密码提示问题答案
            if (answer){
                // 检查密码提示问题答案
                _user.checkAnwser({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res){
                    _this.data.anwser = anwser; 
                    _this.data.token = res;
                    _this.loadStepPassword(); 
                }, function(errMsg){
                    formError.show(errMsg);
                }); 
            }else{// 没有输入密码提示问题答案
                formError.show('请输入密码提示问题的答案');
            }
        });     

        // 输入新密码后的按钮点击
        $('#submit-password ').click(function(){
            var password  = $.trim($('#password').val());
            // 输入了新密码
            console.log(password.length);
            if (password && password.length >= 6){ 
                // 检查密码提示问题答案
                _user.resetPassword({ 
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset'; 
                }, function(errMsg){
                    formError.show(errMsg);
                }); 
            }else{// 没有输入新密码
                formError.show('请输入不少于六位的新密码');
            }
        });     
    },
    // 加载输入用户名的一步
    loadStepUsername: function(){
        $('.step-username').show();
    },
    // 加载输入密码提示问题答案的一步
    loadStepQuestion: function(){
        // 清除错误提示
        formError.hidde(); 
        // 做容器的切换
        $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
    },
    // 加载输入密码的一步 
    loadStepPassword: function(){
        // 清除错误提示
        formError.hidde(); 
        // 做容器的切换
        $('.step-question').hide().siblings('.step-password').show();
    },
     
}; 

$(function(){
    page.init();
});