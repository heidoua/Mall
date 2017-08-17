/*
 * @Author: FangFeiyue 
 * @Date: 2017-08-16 17:55:36 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-08-17 11:32:43
 */
require("./index.css");
var tool = require("util/tool.js");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var templateIndex = require("./index.string");
var _user = require("service/user-service.js");
var navSide = require("page/common/nav-side/index.js");

//表单里的错误提示
var formError = {
  show: function(errMsg) {
    $(".error-item").show().find(".error-msg").text(errMsg);
  },
  hidde: function() {
    $(".error-item").hide().find(".error-msg").text("");
  }
};

//page逻辑部分
var page = {
  init: function() {
    // 加载用户信息
    this.onLoad();
    this.bindEvent();
  },
  bindEvent: function() {
    var _this = this;

    //点击提交按钮后的动作
    $(document).on("click", ".btn-submit", function() {
      var userInfo = {
          phone: $.trim($("#phone").val()),
          email: $.trim($("#email").val()),
          answer: $.trim($("#answer").val()),
          question: $.trim($("#question").val())
        },
        
        validateResult = _this.validateForm(userInfo);

      if (validateResult.status) {
        // 更改用户信息
        _user.updateUserInfo(
          userInfo,
          function(res) {
            tool.successTips(msg);
            window.location.href = "./user-center.html";
          },
          function(errMsg) {
            tool.errorTips(errMsg);
          }
        );
      } else {
        tool.errorTips(validateResult.msg);
      }
    });
  },
  onLoad: function() {
    //初始化左侧菜单
    navSide.init({
      name: "user-center"
    });
    this.loadUserInfo();
  },
  // 加载用户信息
  loadUserInfo: function() {
    var userHtml = "";
    _user.getUserInfo(
      function(res) {
        userHtml = tool.renderHtml(templateIndex, res);
        $(".panel-body").html(userHtml);
      },
      function(errMsg) {
        tool.errorTips(errMsg);
      }
    );
  },
  // 验证字段信息
  validateForm: function(formData) {
    var result = {
      status: false,
      msg: ""
    };

    // 验证手机号
    if (!tool.validate(formData.phone, "phone")) {
      result.msg = "手机格式不正确";
      return result;
    }

    // 验证邮箱
    if (!tool.validate(formData.email, "email")) {
      result.msg = "邮箱格式不正确";
      return result;
    }

    // 验证密码提示问题
    if (!tool.validate(formData.question, "require")) {
      result.msg = "密码提示问题不能为空";
      return result;
    }

    // 验证密码答案
    if (!tool.validate(formData.answer, "require")) {
      result.msg = "密码提示问题的答案不能为空";
      return result;
    }

    //通过验证，返回正确提示
    result.status = true;
    result.msg = "验证成功";

    return result;
  }
};

$(function() {
  page.init();
});
