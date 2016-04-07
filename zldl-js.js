/**
 * Created by zhaoldl on 2016/3/17.工具类
 */
! function() {
    var e = {
        //判断是否是Android
        isAndroid: navigator.userAgent.indexOf('Android') != -1 || navigator.userAgent.indexOf('Linux') != -1,
        //获取url中的参数
        urlParam: function(param) {
            var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)'),
                r = window.location.search.substr(1).match(reg);
            return r != null ? decodeURIComponent(r[2]) : null;
        },
        //获取cookie
        getCookie: function(name) {
            var arr = [],
                reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            return (arr = document.cookie.match(reg)) ? arr[2] : null;
        },
        /**
         * [ajaxForJson description]
         * @param  {[type]} url     [ajax url]
         * @param  {[type]} type    ['GET','POST',...]
         * @param  {[type]} data    [jsondata]
         * @param  {[type]} succFun [successed function]
         * @param  {[type]} failFun [failed function]
         * @param  {[type]} async  [true false]
         * @return {[type]}         [description]
         */
        ajaxForJson: function(url, type, data, succFun, failFun, async) {
            //创建XMLHttpRequest对象
            var XMLHttpReq,
                _async = typeof(async) == 'undefined' || async;
            try {
                XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP"); //IE高版本创建XMLHTTP
            } catch (E) {
                try {
                    XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP
                } catch (E) {
                    XMLHttpReq = new XMLHttpRequest(); //兼容非IE浏览器，直接创建XMLHTTP对象
                }
            }
            XMLHttpReq.open(type, url, _async);
            //指定响应函数
            XMLHttpReq.onreadystatechange = function() {
                if (XMLHttpReq.readyState == 4) {
                    var jsonData = JSON.parse(XMLHttpReq.responseText)
                    if (XMLHttpReq.status == 200) {
                        //成功
                        succFun(jsonData);
                    } else {
                        //失败
                        failFun(jsonData);
                    }
                }
            };
            XMLHttpReq.send(data);
        },
        //两数相加，防止出现0.1+0.7==>0.79999999999
        add: function(a, b) {
            var r1, r2, m;
            try {
                r1 = a.toString().split('.')[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = b.toString().split('.')[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (a * m + b * m) / m;
        },
        //自动移动到可视区域，如果是IOS直接滚，如果是android，已唤出输入法就直接滚否则要监听onresize事件,注意IE不支持outerHeight
        scrollIntoView: function(dom) {
            if ((navigator.userAgent.indexOf('Android') == -1 && navigator.userAgent.indexOf('Linux') == -1) || (document.body.offsetHeight < window.outerHeight)) {
                dom.scrollIntoView(true);
            } else {
                window.onresize = function() {
                    dom.scrollIntoView(true);
                }
            }
        },
        //获取url全路径
        path: function() {
            var e = location.href,
                i = e.lastIndexOf('/');
            return e.substring(0, i + 1);
        }
    };
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    "object" == typeof exports ? module.exports = e : "function" == typeof define && (define.cmd || define.amd) ? define(function() {
        return e
    }) : this.util = e;
}()
