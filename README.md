# my-js author zldl

自己整理和手写的一些常用功能，用法：
>1、直接引入当前js文件，可在全局window下生成一个util对象，用util.xxx来调用各方法，如util.urlParam('id')，获取url中id参数  
>2、require引入当前js文件，如var aaa=require('zldl-js');aaa.urlParam('id')，获取url中id参数

自定义的方法：

>1、获取url中的参数：urlParam(paramName);  
//paramName要获得的参数名

>2、获取cookie中的参数：getCookie(cookieName);  
//要获得的cookie名

>3、针对JSON的ajax请求：ajaxForJson(url, type, data, succFun, failFun)  
//url ajax的url；type 请求方式类型'GET','POST'；data 要传的数据；succFun 成功回调；failFun 失败回调

>4、判断当前设备是否是android：isAndroid  
//直接是布尔值，而不是函数

>5、当前元素自动滚动到可视区域：scrollIntoView(dom)  
//需要传入dom元素，做了IOS、android兼容

>6、两数相加：add(a,b)  
//防止出现0.1+0.7==>0.79999999999  

>7、获取url中资源前的全路径：fullPath  
//例：http://www.baidu.com/images/co/page/logo.jpg ==> http://www.baidu.com/images/co/page/

为原生对象添加的方法：

>1、自定义日期格式  
对Date的扩展，将 Date 转化为指定格式的String，月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
