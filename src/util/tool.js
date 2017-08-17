/*
 * @Author: FangFeiyue 
 * @Date: 2017-08-10 17:58:13 
 * @Last Modified by: FangFeiyue
 * @Last Modified time: 2017-08-17 11:30:10
 */
var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
};
 
var tool = {
    //网络请求
    request: function(param){
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url:  param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res){
                //请求成功
                if (0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }else if(10 === res.status){
                    //强制登录
                    _this.doLogin();
                }else if (1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function(error){
                typeof param.error === 'function' && param.error(error.statusText)
            }
        });
    },
    //获取服务器地址
    getServerUrl: function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');              var result =  window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;  
    },
    //渲染html模板
    renderHtml: function(htmlTemplate, data){
        //编译
        var template = Hogan.compile(htmlTemplate),
        //输出
        result = template.render(data);    
        return result;  
    },
    //成功提示
    successTips: function(msg){
        alert(msg || '操作成功！');
    },
    //错误提示
    errorTips: function(error){
        alert(error || '哪里不对了！');
    },
    //字段的验证，支持非空，手机，邮箱
    validate: function(value, type){
        var value = $.trim(value);//去掉前后空格，如果不是字符串会变为字符串
        
        //非空验证
        if('require' === type){
            return !!value;//强转为bool
        }

        //手机号验证
        if ('phone' === type){
            return /^1\d{10}$/.test(value); 
        }

        //邮箱的验证
        if ('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin: function(){ 
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //调回主页
    goHome: function(){
        window.location.href = './index.html';
    }
};

module.exports = tool;