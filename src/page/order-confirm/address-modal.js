/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-25 18:20:05 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-10-26 14:29:46
 */
var tool                 = require("util/tool.js"),
    _cities              = require('util/cities/index.js'),
    _address             = require('service/address-service.js'),
    templateAddressModal = require('./address-modal.string');

var addressModal = {
    show: function(option){
        // option的绑定
        this.option      = option;
        this.option.data = option.data || { };
        this.$modalWrap  = $('.modal-wrap');
        
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

        // 提交收货地址
        this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate     = _this.option.isUpdate;    
            // 使用新地址且验证通过
            if (!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data, function(res){
                    tool.successTips('地址添加成功'); 
                    _this.hide();
                    typeof _this.option.onSuccess  === 'function' && _this.option.onSuccess(res);
                }, function(errMsg){
                    tool.errorTips(errMsg);    
                });
            }else if (isUpdate && receiverInfo.status){// 更新收件人地址且验证通过
                 _address.update(receiverInfo.data, function(res){
                    tool.successTips('地址修改成功');
                    _this.hide();
                 },function(errMsg){
                    tool.errorTips(errMsg);
                });
            }else{ // 验证不通过
                tool.errorTips(receiverInfo.errMsg || '好像哪里不对了~~~');
            }
        });

        // 保证点击modal内容区域的时候保证不关闭弹窗
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();
        });
        // 点击叉号或者蒙版区域关闭弹窗
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        }); 
    },
    // 渲染页面
    loadModal: function(){
        var addressModalHtml = tool.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvinces();
        // 加载城市
        // this.loadCities();
    },
    // 加载省份信息
    loadProvinces: function(){
        var provinces       = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');

        $provinceSelect.html(this.getSelectOption(provinces));

        // 如果是更新地址，并且有省份信息，做省份的回填
        if (this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        } 
    },
    // 加载城市信息
    loadCities: function(provinceName){
        var cities      = _cities.getCities(provinceName),
            $citySelect = this.$modalWrap.find('#receiver-city');
        
        $citySelect.html(this.getSelectOption(cities));

        // 如果是更新地址并且有城市信息，做城市的回填
        if (this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    // 获取select框的选项
    getSelectOption: function(optionArray){
        var html = '<option value="">请选择</option>';

        for (var i = 0, len = optionArray.length; i < len; i++){
            html += '<option value="'+ optionArray[i] +'">' + optionArray[i] + '</option>';
        } 

        return html;
    },
    // 获取收件人信息，并做表单的验证
    getReceiverInfo: function(){
        var receiverInfo = {},
            result       = {
                status   : false
            };

        receiverInfo.receiverName     = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity     = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone    = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress  = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiver-zip').val());

        if (!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名'; 
        }else if (!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份';
        }else if (!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市';
        }else if (!receiverInfo.receiverAddress){
            result.errMsg = '请输入收件人详细地址';
        }else if (!receiverInfo.receiverPhone){
            result.errMsg = '请输入收件人联系电话';
        }else {
            // 所有验证都通过了
            result.status = true;
            result.data   = receiverInfo;
        }

        return result;
    },
    // 关闭弹窗
    hide: function(){
        this.$modalWrap.empty();
    }    
} 

module.exports = addressModal;