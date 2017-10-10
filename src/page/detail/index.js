/*
 * @Author: FangFeiyue 
 * @Date: 2017-09-22 14:46:10 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-09-22 15:08:23
 */
require("./index.css");
var tool = require("util/tool.js");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var templateIndex = require("./index.string");
var _cart = require("service/cart-service.js");
var _product = require("service/product-service.js");

var page = {
    data: {
        productId: tool.getUrlParam('productId') || ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        // 如果没有productId则自动跳转回首页
        if(!this.data.productId){
            tool.goHome();
        }
        this.loadDetail(); 
    },
    bindEvent: function(){   
        var _this = this;
        // 图片预览
        $(document).on('mouseenter','.p-img-item',function(){
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imgUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currentCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount =  _this.data.detailInfo.stock || 1;

            if (type === 'plus'){
                $pCount.val(currentCount < maxCount ? currentCount + 1 : maxCount);
            }else if(type === 'minus'){
                $pCount.val(currentCount > minCount ? currentCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                tool.errorTips(errMsg);
            });
        });
    },
    // 加载商品详情数据 
    loadDetail: function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        // loading   why 
        $pageWrap.html('<div class="loading"></div>');

        // 请求detail信息  
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            _this.data.detailInfo = res;
            html = tool.renderHtml(templateIndex, res);
            console.log(html);
            $pageWrap.html(html);     
        }, function(errMsg) { 
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>'); 
        });
    },
    // 数据匹配 
    filter: function(data){
         data.subImages = data.subImages.split(',');
    }
};

$(function(){
    page.init();
});