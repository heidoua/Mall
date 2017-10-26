/*
 * @Author: FangFeiyue 
 * @Date: 2017-10-26 12:33:16 
 * @Last Modified by:   FangFeiyue 
 * @Last Modified time: 2017-10-26 12:33:16 
 */
(function ($) {
    function preLoad(imgs, options) {
        //传入imgs参数是图片 还是 数组
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        //处理传入参数
        this.opts = $.extend({}, preLoad.DEFAULTS, options);
        //有序加载
        if(this.opts.order === 'ordered'){
            this._ordered();
        }else{
            //无序加载
            this._unordered();
        }
    }

    preLoad.DEFAULTS = {
        order:'unordered',//默认值：无顺预加载
        each: null,  // 每一张图片加载完毕后执行
        all: null,   // 所有图片加载完后执行
    }
    preLoad.prototype._ordered = function(){
        var opts = this.opts,
        imgs = this.imgs,
        len = imgs.length,
        count = 0;
        load();
        //有序预加载
        function load(){
            //实例化Image对象
            var imgObj = new Image();
            //监听load和error事件
            $(imgObj).on('load error',function(){
                //每加载一张图片触发的事件
                opts.each && opts.each(count);
                if (count >= len) {                    
                    //所有的图片已经加载完 触发的事件
                    opts.all && opts.all();
                } else{
                    load();
                }
                count++;
            });
            //图片路径赋值
            imgObj.src = imgs[count];
        }
    };
    preLoad.prototype._unordered = function () {
        //无序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {
            //判断图片路径是否是字符串
            if (typeof src != 'string') {
                return;
            }
            //实例化Image对象
            var imgObj = new Image();
            //监听load和error事件
            $(imgObj).on('load error', function () {
                //每加载一张图片触发的事件
                opts.each && opts.each(count);
                if (count >= len - 1) {
                    //所有的图片已经加载完 触发的事件
                    opts.all && opts.all();
                }
                count++;
            });
            //给图片赋值路径
            imgObj.src = src;
        });
    };
    $.extend({
        preload: function (imgs, opts) {
            new preLoad(imgs, opts);
        }
    });
})(jQuery);