# my-js author zldl
自己整理和手写的一些常用功能，用法：
1、直接引入当前js文件，可在全局window下生成一个util对象，用util.xxx来调用各方法，如util.urlParam('id')，获取url中id参数
2、require引入当前js文件，如var aaa=require('zldl-js');aaa.urlParam('id')，获取url中id参数

自定义的方法：

1、获取url中的参数：urlParam(paramName);
//paramName要获得的参数名

2、获取cookie中的参数：getCookie(cookieName);
//要获得的cookie名

3、针对JSON的ajax请求：ajaxForJson(url, type, data, succFun, failFun)
//url ajax的url；type 请求方式类型'GET','POST'；data 要传的数据；succFun 成功回调；failFun 失败回调

4、判断当前设备是否是android：isAndroid
//直接是布尔值，而不是函数

5、当前元素自动滚动到可视区域：scrollIntoView(dom)
//需要传入dom元素，做了IOS、android兼容

为原生对象添加的方法：

1、自定义日期格式
例：var date = new Date();date.Format('yyyy-MM+++++dd'); //'2016-03++++++18'
