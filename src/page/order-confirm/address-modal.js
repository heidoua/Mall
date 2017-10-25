/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-25 18:20:05 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-25 18:41:40
 */
var tool                 = require("util/tool.js"),
    _address             = require('service/address-service.js'),
    templateAddressModal = require('./address-modal.string');

var addressModal = {
    show: function(option){
        // option的绑定
        this.option = option;
        this.$modalWrap = $('.modal-wrap');
        // 渲染页面
        this.loadModal();
        // 绑定事件 
        this.bindEvent(); 
    },
    bindEvent: function(){

    },
    loadModal: function(){
        var addressModalHtml = tool.renderHtml(templateAddressModal, this.option.data);
        this.$modalWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvinces();
        // 加载城市
        this.loadCities();
    },
    // 加载省份信息
    loadProvinces: function(){

    },
    // 加载城市信息
    loadCities: function(){

    },
    hide: function(){
        
    }    
} 

module.exports = addressModal;