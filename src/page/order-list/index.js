/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-27 14:56:58 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-27 14:57:23
 */
require('./index.css');
var tool = require('util/tool.js'); 
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateIndex = require('./index.string');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');

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
   init:  function(){
       //初始化左侧菜单
       navSide.init({
           name: 'user-center'
       });
       // 加载用户信息
       this.onLoad();     
   },
   onLoad: function(){
       this.loadUserInfo();
   },
   // 加载用户信息
   loadUserInfo: function(){
       var userHtml = '';
       _user.getUserInfo(function(res){
           userHtml = tool.renderHtml(templateIndex, res);
           $('.panel-body').html(userHtml );
       }, function(errMsg){
           tool.errorTips(errMsg);
       });
   }
}; 

$(function(){
   page.init();
}); 