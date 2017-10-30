/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-12 11:18:42 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-26 13:23:26
 */
require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var tool            = require("util/tool.js"),
    _order          = require("service/order-service.js"),
    _address        = require("service/address-service.js"),
    addressModal    = require('./address-modal.js'),
    templateProduct = require("./product-list.string"),
    templateAddress = require("./address-list.string");

var page = {
    data: {
        selectedAddressId: null
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        // 加载地址列表
        this.loadAddressList();
        // 加载商品列表
        this.loadProductList(); 
    },
    bindEvent: function(){
        // 选择地址
        this.selectAddress(this);
        // 订单提交
        this.submitOrder(this);
        // 地址的添加
        this.addressAdd(this);
        // 编辑地址
        this.addressEditor(this);
        // 删除收货人地址
        this.addressDel(this);
    },
    // 加载地址列表 
    loadAddressList: function(){
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml = tool.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function(){
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    // c处理地址列表中选中状态
    addressFilter: function(data){
        if (this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            
            for (var i = 0, len = data.list.length; i < len; i++){
                if (data.list[i].id === this.data.selectedAddressId){
                     data.list[i].isActive = true;
                     selectedAddressIdFlag = true;
                }
            }
            // 如果以前选中的地址不在列表里了，将其删除
            if (!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    },
    // 加载商品列表
    loadProductList: function(){
        var _this = this;
        // 添加loading动画
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res){
            var productListHtml = tool.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(){
            $('.address-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        });
    },
    // 地址的选择
    selectAddress: function(_this){
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');    
        });
    },
    // 订单提交
    submitOrder: function(_this){
        $(document).on('click', '.order-submit', function(){
             var shippingId = _this.data.selectedAddressId;
             alert(shippingId);
             return;
             if (!shippingId){
                _order.createOrder(shippingId, function(res){
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg){
                    tool.errorTips(errMsg);
                });
             }else{
                 tool.errorTips('请您选择地址后再提交订单');
             }
        });
    },
    // 地址的添加
    addressAdd: function(_this){
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate: false,
                onSuccess: function(){
                    _this.loadAddressList();
                }
            });
        });
    },
    // 编辑地址
    addressEditor: function(_this){
        $(document).on('click', '.address-update', function(e){
            // 阻止冒泡
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            
            _address.getAddress(shippingId, function(res){
                addressModal.show({
                    isUpdate : true,
                    data     : res,
                    onSuccess: function(){
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg){
                tool.errorTips();
            });
        });
    },
    // 删除收货人地址
    addressDel: function(_this){
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if (window.confirm('确认要删除改地址吗？')){
                _address.deleteAddress(id, function(res){
                    console.log(res);
                    tool.successTips(res);
                    _this.loadAddressList();
                },function(errMsg){
                    tool.errorTips(errMsg);
                });
            }
        });
    }
}

$(function(){
    page.init();
});