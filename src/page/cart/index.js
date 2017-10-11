/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-10 17:23:18 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-11 19:25:40
 */
require("./index.css");
require("page/common/header/index.js");
var tool          = require("util/tool.js");
var templateIndex = require("./index.string");
var _cart         = require("service/cart-service.js"); 
var nav           = require("page/common/nav/index.js");

var page = {
    data: {},
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){ 
        this.loadCart(); 
    },
    bindEvent: function(){   
        // 选择购物车商品或者取消选择购物车商品
        this.selectOrUnSelectProduct(this);
        // 全选或取消全选 
        this.selectOrunSelectAllProducts(this);
        // 更新购物车产品数量 
        this.updateCartProductCount(this);
        // 删除单个商品 
        this.delSingleUnNeedProduct(this);
        // 删除选中的商品 
        this.delSelectedProduct(this);
        // 去结算
        this.submitOrder(this); 
    },
    // 加载购物车信息  
    loadCart: function(){
        var _this = this;
        // 获取购物车列表 
        _cart.getCartList(function(res) {
            _this.renderCart(res); 
        }, function(errMsg) {
            _this.showCartError();
        });
    },
    // 渲染购物车
    renderCart: function(data){
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        var cartHtml       = tool.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml); 
        // 通知导航条的购物车更新数量
        nav.loadCartCount(); 
    },
    // 数据匹配
    filter: function(data){ 
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 显示错误信息 
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试</p>');
    },
    // 选择购物车商品或者取消选择购物车商品 
    selectOrUnSelectProduct: function(_this){
        // 商品的选择/取消选择
        $(document).on('click', '.cart-select', function() {
            var $this      = $(this),
                $productId = $this.parents('.cart-table').data('product-id');
            // 选中
            if ($this.is(':checked')){
                _cart.selectProduct($productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }else{ // 取消选中
                _cart.unselectProduct($productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }     
        });
    },
    // 全选或取消全选
    selectOrunSelectAllProducts: function(_this){
        // 商品的全选/非全选
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this); 
            // 全选
            if ($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }else{ // 取消全选
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }     
        });
    },
    // 修改商品数量
    updateCartProductCount: function(_this){
        $(document).on('click', '.count-btn', function(){
            var $this      = $(this),
                $pCount    = $this.siblings('.count-input'),
                currCount  = parseInt($pCount.val()),
                type       = $this.hasClass('plus') ? 'plus': 'minus',
                $productId = $this.parents('.cart-table').data('product-id'),
                minCount   = 1,
                maxCount   = parseInt($pCount.data('max')),
                newCount   = 0;
            if (type === 'plus'){
                if (currCount >= maxCount){
                    tool.errorTips('该商品数量已经达到上限');
                    return '' ;
                }
                newCount = currCount + 1; 
            }else{
                if (currCount <= minCount){
                    return '' ; 
                }
                newCount = currCount - 1; 
            }
            // 更新购物车数量
            _cart.updateCartProductCount({
                productId: $productId,
                count: newCount
            },function(res){
                _this.renderCart(res);
            },function(){
                _this.showCartError();
            });
        });
    },
    // 删除单个商品
    delSingleUnNeedProduct: function(_this){
        $(document).on('click', '.cart-delete', function(){
            if (window.confirm('您确认要删除该商品吗？')){
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.delCartProduct(productId);
            }
        });
    },
    // 删除指定商品，支持批量删除，productId用逗号分隔
    delCartProduct: function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        }); 
    },
    // 删除选中 
    delSelectedProduct: function(_this){
        $(document).on('click', '.delete-selected', function(){
            var arrProductIds = [],
                $selectedItem = $('.cart-select:checked');
            // 循环查找选中的productIds    
            for (var i = 0, iLength = $selectedItem.length; i < iLength; i++){
                arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
            }

            if (arrProductIds.length){
                if (window.confirm('您确认要删除选中的商品吗？')){
                    _this.delCartProduct(arrProductIds.join(','));
                }
            }else{
                tool.errorTips('您还没有选中要删除的商品');
            }
        });
    },
    // 去结算
    submitOrder: function(_this){
        $(document).on('click', '.btn-submit', function(){
            console.log(_this.data.cartInfo);
            //  总价格大于零，进行提交
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './payment.html?1497096434996';
                // window.location.href = './confirm.html';
            }else{
                tool.errorTips('请选择商品后再提交');
            }
        });
    } 
};

$(function(){
    page.init();
});