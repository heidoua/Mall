/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-27 14:56:58 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-27 16:38:55
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var tool          = require('util/tool.js'),
    _order        = require('service/order-service.js'),
    navSide       = require('page/common/nav-side/index.js'),
    Pagination    = require('util/pagination/index.js'),
    templateIndex = require('./index.string');

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
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
   init:  function(){
       //初始化左侧菜单
       navSide.init({
           name: 'order-list'
       });
       // 加载用户信息
       this.onLoad();     
   },
   onLoad: function(){
       this.loadOrderList();
   },
    //    加载订单列表
   loadOrderList: function(){
        var _this         = this,
            orderListHtml = '',
            $listCon      = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function(res){
            // 渲染html
            orderListHtml = tool.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                pages: res.pages,  
                prePage: res.prePage,
                pageNum: res.pageNum,
                nextPage: res.nextPage, 
                hasNextPage: res.hasNextPage,
                hasPreviousPage: res.hasPreviousPage
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后再试~~</p>');
        });
   },
   // 加载分页信息
   loadPagination: function(pageInfo){
        var _this = this;
        this.pagination ? '' : this.pagination = new Pagination();
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum){
                _this.data.listParam.pageNum = pageNum; 
                _this.loadOrderList();
            }
        }));  
    }
}; 

$(function(){
   page.init();
}); 