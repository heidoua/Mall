require('./index.css');

var tool = require('util/tool.js');

//通用页面头部
var header = {
    init: function(){
        this.bindEvent();
    },
    onload: function(){
        var keyword =  tool.getUrlParam('keyword ');
        //keyword存在则回填输入框
        if (keyword){
            $('#search-input'). val(keyword);
        }
    },
    bindEvent: function(){
        var _this = this;
        //点击搜索按钮以后搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit(); 
        });

        //输入回车后做搜索提交
        $('#search-input').keyup(function(e){
            //13是回车键键的keyCode 
            if (e.keyCode === 13){
                _this.searchSubmit();
             }
        });
    },
    //搜索的提交
    searchSubmit: function(){
        var keyword = $.trim($('#search-input').val());

        //如果提交的时候有keyword，正常跳转到list页
        if (keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{//入股keyword为空直接返回首页 
            tool.goHome();
        }     
    },
};

//header中的方法不需要外部调用，所以不需要module.exports
//module.exports = header.init();

header.init();