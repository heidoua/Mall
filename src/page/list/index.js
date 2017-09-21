/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-08 09:28:11 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-21 14:30:56
 */
require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var tool = require("util/tool.js");
var _product = require("service/product-service.js");
var templateIndex = require("./index.string");

var page = {
    data: {
        listParam: {
            pageNum: tool.getUrlParam('pageNum') || 1,
            orderBy: tool.getUrlParam('orderBy') || 'default',
            keyword: tool.getUrlParam('keyword') || '',
            pageSize: tool.getUrlParam('pageSize')  || 20,
            categoryid: tool.getUrlParam('categoryid') || ''
        }    
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadList();
    },
    bindEvent: function(){

    },
    // 加载list数据
    loadList: function(){
        var _this = this, 
        listHtml = '', 
        listParam = this.data.listParam;
        
        // 获取list列表
        _product.getProductList(listParam, function(res){ 
            listHtml = tool.renderHtml(templateIndex, {
                list: res.list 
            });
            console.log('testtttt====>', listHtml);
            $('.p-list-con').html(listHtml);
            _this.loadPagination(res.pageNum,  res.pages);
        }, function(errMsg){
            tool.errorTips(errMsg);
        });     
    },
    // 加载分页信息
    loadPagination: function(pageNum, pages ){
         
    }
};

$(function(){
    page.init();
});