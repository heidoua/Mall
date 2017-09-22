# Mall
电商项目(PC端)
# 主要功能
一、网站首页功能特点

推荐搜索关键字的快捷链接
活动展示的轮播图
使用了Unslider，使用起来特别简单，兼容性也好，具体使用步骤见官网　
　　 3. 分楼层的商品分类信息 

二、商品列表页功能点

 商品列表的展示
所需接口：
产品搜索及动态排序所需字段：categoryId/keyword、pageNum、pageSize、orderBy:排序参数　　
排序的逻辑
分页的处理
三、商品详情页功能

商品信息展示
缩略图预览
添加购物车
所需接口：
商品详情接口
添加购物车的接口所需字段：productId, count
查询购物车产品数量所需字段：无　

# 遇到的问题
1.因为是用的别人服务器上的数据，所以出现了跨域问题，但没法跟人商量，让人来解决跨域的问题，所以找了个临时的方法解决跨域

2.做商品列表分页时，如果点击分页过快，文字就会被选中，解决的办法，利用css3中的user-select新属性来解决。
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
