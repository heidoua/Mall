//我们要是想把它做成一个全局的模块的 
//console.log('i am global'); 测试用的

require('./layout.css');

//引入字体库font-awesome
require('node_modules/font-awesome/css/font-awesome.min.css');

//因为每个页面都需要footer，所有不需要单独新建footer.js再引入css，直接在这里引入即可
require('./footer/index.css');