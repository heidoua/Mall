/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-06 18:41:10 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-06 18:43:34
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var tool             = require('util/tool.js');
var _user           = require('service/user-service.js');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password       : $.trim($('#password').val()),
                passwordNew       : $.trim($('#password-new').val()),
                passwordConfirm    : $.trim($('#password-confirm').val()),
                answer      : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(res, msg){
                    tool.successTips(msg);
                }, function(errMsg){
                    tool.errorTips(errMsg);
                });
            }
            else{
                tool.errorTips(validateResult.msg);
            }
        });
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证密码
        if(!tool.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不能少于六位';
            return result;
        }
        // 验证两次的密码是不是一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入密码输入不一致，请重新输入';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});