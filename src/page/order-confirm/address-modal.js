/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-25 18:20:05 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-25 19:33:49
 */
var tool                 = require("util/tool.js"),
    _cities              = require('util/cities/index.js'),
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
        var _this = this;
        // select change事件
        // 省市二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();

            _this.loadCities(selectedProvince);
        });
    },
    // 渲染页面
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
        var provinces       = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');

        $provinceSelect.html(this.getSelectOption(provinces));
    },
    // 加载城市信息
    loadCities: function(provinceName){
        var cities = _cities.getCities(provinceName),
            $citySelect = this.$modalWrap.find('#receiver-city');
        
        $citySelect.html(this.getSelectOption(cities));
    },
    // 获取select框的选项
    getSelectOption: function(optionArray){
        var html = '<option value="">请选择</option>';

        for (var i = 0, len = optionArray.length; i < len; i++){
            html += '<option value="'+ optionArray[i] +'">' + optionArray[i] + '</option>';
        } 

        return html;
    },
    hide: function(){
        
    }    
} 

module.exports = addressModal;