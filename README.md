# 电商平台项目(PC端)
## 下载源码
```
git clone https://github.com/fangfeiyue/Mall.git
```
## 运行项目
```
npm install
npm run dev
```
## 项目描述
这是一个相对简易的电商品台，虽然相对简易，但也是麻雀虽小五脏俱全，电商平台需要的主要功能基本都实现了，本项目主要实现了电商平台常用的几大模块：用户模块、商品模块、购物车模块、订单模块、支付模块。

### 技术选型
- 版本控制：git
- 开发工具：vscode
- 软件开发过程：敏捷开发
- 框架选择：jQuery + css + [Hogan](http://www.qdfuns.com/notes/31986/c84f112cf773005a31caacc3736da971.html)
- 模块化方案：CommonJS + Webpack
- 前后端分离方式：完全分离，纯静态方式
### 基本演示
![基本功能演示](https://github.com/fangfeiyue/Mall/blob/master/net.gif)

### 几大模块简介：
- 用户模块
    - 数据安全性处理
    - 表单同步/异步验证
    - 小型SPA开发
- 商品模块
    - jQuery插件模块化改造
    - 独立组件抽离
    - 多功能列表开发
- 购物车模块
    - 技术点：
        - 商品状态随时验证方案
        - 模块内部方法调用方式
        - 非Form提交时的数据验证
    - 功能点：
        - 购物车中商品的展示
        - 修改购物车中的商品数量
        - 选中/取消选中购物车中的商品
        - 全选/取消全选购物车中的商品
        - 删除单个/多个购物车商品
        - 购物车结算
- 订单模块
    - 技术点
        - Modal式组件封装思想
        - 城市级联操作
        - 复杂表单回填
    - 订单确认页功能点
        - 地址管理(增、删、改、查)
        - 订单商品信息的展示
        - 订单的提交
    - 订单列表页功能点
        - 订单列表的展示
        - 分页 
    - 订单详情页功能点
        - 订单详情的展示
        - 未支付订单可以支付
        - 取消订单
    
- 支付模块
    - 支付宝支付功能对接
    - 支付状态检测
    - 支付成功回执处理

## 遇到的问题
1.因为是用的别人服务器上的数据，所以出现了跨域问题，但没法跟人商量，让人来解决跨域的问题，所以找了个临时的方法解决跨域
[暂时解决跨域的办法](http://www.qdfuns.com/notes/31986/63184ce6a03d35b736e7f78eca43a3ae.html)  

2.做商品列表分页时，如果点击分页过快，文字就会被选中，在谷歌浏览器呈现蓝色背景，解决的办法，利用css3中的user-select新属性来解决。
```
-moz-user-select : none;
-webkit-user-select : none;
-ms-user-select : none;
user-select : none;
```
3.商品列表排序按钮左右相邻的元素都给了border，导致紧挨着的border比别的地方宽　
```
margin-right: -1px;
```
4.在写商品详情页的时候导航、搜索等样式失效,找了半天也没到原因，看哪里都正确，后来一句句代码从头过，才发现犯了个特低级的错误,在webpack配置文件中配置详情页的entry时，'detail'后面多加了空格,去掉空格就好了
```
entry: {'detail': ['./src/page/detail/index.js']}
```
5.商品详情宝贝的缩略图地址放到了一个索引数组中，如何顺序将数组中的元素渲染出来呢？在Hogan中，点表示当前的元素
```
{{#subImages}}
    <li class="p-img-item">
        <img class='p-img' src="{{imageHost}}{{.}}" alt="{{name}}">
    </li>
{{/subImages}}
```
6.用Hogan渲染商品详情页详情信息的时候，因为后台返回的数据包含在了`html`标签中，如果用两个花括号取值，页面显示的是`html`标签包裹的数据如：`<p>`这是一个款好手机`</p>`，我们想要页面直接渲染出数据而不是是html标签，此时要用三个花括号包裹
```
<div class="detail-con">{{{detail}}}</div>
```
7.在markdown中输入`html`标签会出现不显示的情况，因为被默认为是一种标签，解决办法：用``包裹`html`标签
```
`<p>`我是markdown里的html标签`</p>`
```
8. 对接支付宝
- 支付宝支付的两种对接方式
    - return_url方式

    ![return_url方式](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/C68F1402C7614F5FBA4DD9D8C7A8BBB6/17824)

    在这个过程中return_url一定是个后端的页面，如果在前后端完全分离，想使用这种方式，必须先跳到一个后端提供的页面上，处理完逻辑后，通过js跳转到前端页面上。最后一步url跳转的时候，用户把浏览器关掉，我们的支付结果是得不到通知的

    - notify_url方式
    
    ![notify_url方式](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/7103477ED3EF46F3BA20A39AEF1ABEE4/17826)   

- 支付相关的参考文档
    - [沙箱登录](https://openhome.alipay.com/platform/appDaily.htm)
    - [沙箱环境使用说明](https://doc.open.alipay.com/doc2/detail.htm?treeId=200&articleId=105311&docType=1)
    - [如何使用沙箱环境](https://support.open.alipay.com/support/hotProblemDetail.htm?spm=a219a.7386793.0.0.uS5uZ6&id=251932&tagId=100248)
    - [当面付产品介绍](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.hV5Clx&treeId=193&articleId=105072&docType=1)
    - [扫码支付接入指引](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.Ia6Wqy&treeId=193&articleId=106078&docType=1)
    - [当面付快速接入](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.bROnXf&treeId=193&articleId=105170&docType=1)
    - [当面付接入必读](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.hV5Clx&treeId=193&articleId=105322&docType=1)
    - [当面付进阶功能](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.YFmkxI&treeId=193&articleId=105190&docType=1)
    - [当面付异步通知-仅用于扫码支付](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.BykVSR&treeId=193&articleId=103296&docType=1)
    - [当面付SDK&DEMO](https://support.open.alipay.com/docs/doc.htm?spm=a219a.7386797.0.0.k0rwWc&treeId=193&articleId=105201&docType=1)
    - [服务端SDK](https://doc.open.alipay.com/doc2/detail?treeId=54&articleId=103419&docType=1)
    - [生成RSA密钥](https://doc.open.alipay.com/docs/doc.htm?treeId=291&articleId=105971&docType=1)
    - [线上创建应用说明](https://doc.open.alipay.com/doc2/detail.htm?treeId=200&articleId=105310&docType=1#s0)

9.支付页面功能点
- 请求支付，获取支付二维码
- 轮询检查订单状态，支付成功跳转提示页

10.使用charles做代理暂时解决跨域的问题时，配置错了地址，在跨域的url上右键选择Map Remote修改地址，怎么修改也修改不过来，请求的还是错误的地址，试了半天才找到解决办法：点击charles顶部工具栏倒数第二个有扳手的按钮，取消掉Map Remote再次重新配置对应url的Map Remote就可以修改地址了

11.在终端运行npm run dev报以下错误
```
Error: getaddrinfo ENOTFOUND localhost at errnoException (dns.js:28:10) at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:76:26)
```
在网上找的解决办法一般都说是hosts文件没有配置127.0.0.1 localhost。可我打开看了，是配置了的，把项目发给别人，别人能正常运行。各种百度谷歌也没找到解决办法，仔细分析来分析去，上午的时候还能正常运行，下午也没改什么代码，并且别人的电脑能正常运行项目，这说明代码没问题，唯一变化的就是网络了，上午用的是无线，下午换了有线，难道是这个原因吗？把网络切换到无线，再次运行npm run dev果然运行成功了。好坑~~~

12.jQuery.extend 函数使用详解
### Jquery的扩展方法原型是:
```
extend(dest,src1,src2,src3...);
```
它的含义是将src1,src2,src3...合并到dest中,返回值为合并后的dest,由此可以看出该方法合并后，是修改了dest的结构的。如果想要得到合并的结果却又不想修改dest的结构，可以如下使用：
```
var newSrc=$.extend({},src1,src2,src3...)//也就是将"{}"作为dest参数。
```
这样就可以将src1,src2,src3...进行合并，然后将合并结果返回给newSrc了。如下例：
```
var result=$.extend({},{name:"Tom",age:21},{name:"Jerry",sex:"Boy"})
```
那么合并后的结果
```
result={name:"Jerry",age:21,sex:"Boy"}
```
也就是说后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。
### 省略dest参数
上述的extend方法原型中的dest参数是可以省略的，如果省略了，则该方法就只能有一个src参数，而且是将该src合并到调用extend方法的对象中去，如：
- $.extend(src)
该方法就是将src合并到jquery的全局对象中去，如：
```
$.extend({
hello:function(){alert('hello');}
});
```
就是将hello方法合并到jquery的全局对象中。
- $.fn.extend(src)
该方法将src合并到jquery的实例对象中去，如:
```
$.fn.extend({
hello:function(){alert('hello');}
});
```
就是将hello方法合并到jquery的实例对象中。

下面例举几个常用的扩展实例：
```
$.extend({net:{}});
```
这是在jquery全局对象中扩展一个net命名空间。
```
$.extend($.net,{
hello:function(){alert('hello');}
})
```
这是将hello方法扩展到之前扩展的Jquery的net命名空间中去。
- Jquery的extend方法还有一个重载原型：  
```
extend(boolean,dest,src1,src2,src3...)
```
第一个参数boolean代表是否进行深度拷贝，其余参数和前面介绍的一致，什么叫深层拷贝，我们看一个例子：
```
var result=$.extend( true, {}, 
{ name: "John", location: {city: "Boston",county:"USA"} }, 
{ last: "Resig", location: {state: "MA",county:"China"} } );
```
我们可以看出src1中嵌套子对象location:{city:"Boston"},src2中也嵌套子对象location:{state:"MA"},第一个深度拷贝参数为true，那么合并后的结果就是：
```
result={name:"John",last:"Resig",
location:{city:"Boston",state:"MA",county:"China"}}
```
也就是说它会将src中的嵌套子对象也进行合并，而如果第一个参数boolean为false，我们看看合并的结果是什么，如下：
```
var result=$.extend( false, {}, 
{ name: "John", location:{city: "Boston",county:"USA"} }, 
{ last: "Resig", location: {state: "MA",county:"China"} } 
);
```
那么合并后的结果就是:
```
result={name:"John",last:"Resig",location:{state:"MA",county:"China"}}
```
以上就是$.extend()在项目中经常会使用到的一些细节。
### 生产环境的适配遇到的问题
- 生产环境适配需要配置的东西
    - 添加favicon
    - 线上域名的分离，HTML路径的简化
    - 添加dns-prefetch
    - 对线上打包结果做回归测试

1.webpack打包后，访问index.html页面，图片无法正确加载,原因是webpack配置文件中ouput的dist没有加斜杠，如下
```
output: {
    path      : './dist',//存放文件的一个路径
    publicPath: '/dist',//访问文件时的一个路径
    filename  : 'js/[name].js'
},
```
js和css资源前面会自动补全斜杠，而图片资源不会自动补全，导致图片的路径为distresource/img找不到正确的路径，图片正确的路径应该为dist/resource/img，解决办法dist后面加上斜杠
```
output: {
    path      : './dist/',//存放文件的一个路径
    publicPath: '/dist/',//访问文件时的一个路径
    filename  : 'js/[name].js'
},
```
还有一点需要注意的是webpack1.x中支持相对路径，但webpack1.x以上不支持相对路径了，所以要改成绝对路径，最终的配置为
```
output: {
    path      : __dirname + './dist',//存放文件的一个路径
    publicPath: __dirname + '/dist',//访问文件时的一个路径
    filename  : 'js/[name].js'
},
```

2. 问题：webpack -p压缩完代码，测试的过程中，填写收货地址的弹出，莫名奇妙每个选项赋值'/'

原因：webpack打包的时候把html属性中的双引号自动去掉了

解决办法： 在webpack配置文件中html-loader中添加query，具体内容如下
```
{
test  : /\.string$/,
loader: 'html-loader',
query: {
    // 最小化压缩
    minimize: true,
    // 要不要删除属性上的引号
    removeAttributeQuotes: false 
}
}
```
### 简单的SEO
- SEO概念
SEO是指在了解搜索引擎自然排名机制的基础上，对网站进行内部及外部的调整优化，改进网站在搜索引擎中关键词的自然排名，获得更多的展现量，吸引更多目标客户点击访问网站，从而达到互联网营销及品牌建设的目标。
- SEO衡量标准
    - 关键词排名
    - 收录量
- 常用SEO优化技巧
    - 增加页面数量
    - 减少页面层级，搜索引擎的蜘蛛一般向下爬三四层，不会爬的太深，如果网站必须使用很深的层级就需要做个网站地图来让蜘蛛爬寻页面
    - 关键词密度 
    - 高质量友情链接
    - 分析竞对 
    - SEO数据监控
- 关键词设计
    - 品牌 
    - 高频关键词：电商品台，网上购物，网上商城，数码产品，手机，笔记本，相机，手表，耳机
    - 长尾关键词：
做SEO优化时，最重要的文本都在html中head里分别是标题、关键词、描述。
如：

标题：xx电商平台-最NX的购物网站/用户登录-XX电商平台

关键词：网上商城，数码产品，手机，笔记本，相机，耳机

描述：一个提供数码通讯、手机、电脑、家居百货、服装服饰、母婴、图书、食品等数万种优质商品，最优质、最便捷的网上购物平台。

单页应用的好处：减少服务器的请求压力，静态资源只需要加载一次
## 传说中的彩蛋

vscode使用过程中安装的插件：
- Alignment
    - 作用： 代码对齐
    - 使用方法：option + +=
- GitLens
    - 显示文件最近的commit和作者，显示当前行commit信息
- highlight-matching-tag
    - 作用：html标签配对
## 说明
如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

或者您可以 "follow" 一下，我会不断开源更多的有趣的项目
## 个人简介
作者：房飞跃

博客地址：[前端网](http://www.qdfuns.com/house/31986/note)  [博客园](https://www.cnblogs.com/fangfeiyue)  [GitHub](https://github.com/fangfeiyue)

职业：web前端开发工程师

爱好：探索新事物，学习新知识

座右铭：一个终身学习者

## 联系方式
坐标：北京

QQ：294925572

QQ技术交流群：678941904 ( 欢迎加入此群，与志同道合的朋友一起进步 )

微信：

![XinShiJieDeHuHuan](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/100D55934BB446839482D3EA0CDC3E8D/17820)

## 赞赏
觉得有帮助可以微信扫码支持下哦，赞赏金额不限，一分也是您对作者的鼎力支持

![微信打赏](http://note.youdao.com/yws/public/resource/c2361265179a03449f6d52397fd50033/xmlnote/D77744C8EC944CF6AA232272CBC5CF6D/17828)
