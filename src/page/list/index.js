/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-08 09:28:11 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-21 18:20:45
 */
require("./index.css");
var tool = require("util/tool.js");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var templateIndex = require("./index.string");
var _product = require("service/product-service.js");

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
        var _this = this;
        // 排序的点击
        $('.sort-item').click(function(){
            var $this = $(this);
            // 商品列表排序
            _this.sortList($this, _this);
            // 重新加载列表
            _this.loadList();
        }); 
    },
    sortList: function($this, _this){
        _this.data.listParam.pageNum = 1;
        // 点击默认排序
        if ($this.data('type')==="default"){                  
            // 已经是active类型
            if ($this.hasClass('active')){
                  return; 
              }else{// 其他 
                  $this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
                  _this.data.listParam.orderBy = 'default'; 
              }
        }else if ($this.data('type')==="price"){// 点击价格排序
             $this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
              
            //  升序降序的处理
            if (!$this.hasClass('asc')){
                 $this.addClass('asc').removeClass('desc');
                 _this.data.listParam.orderBy = 'price_asc';
            }else{
                $this.addClass('desc').removeClass('asc');
                _this.data.listParam.orderBy = 'price_desc';
            }
        }
    },
    // 加载list数据
    loadList: function(){
        var _this = this, 
        listHtml = '', 
        listParam = this.data.listParam;

         //每次刷新列表都要加载加载动画
        $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        
        // 删除参数中不必要的字段
        listParam.categoryid ? (delete listParam.keyword) : (delete listParam.categoryid);
        
        // 获取list列表
        _product.getProductList(listParam, function(res){ 
            listHtml = tool.renderHtml(templateIndex, {
                list: res.list 
            });
            $pListCon.html(listHtml);
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