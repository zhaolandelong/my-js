/**
 * Created by zhaoldl on 2016/3/17.工具类
 */
! function() {
    var e = {
        /**
         * [isAndroid 是否是安卓 true-是 false-不是]
         * @type {Boolean}
         */
        isAndroid: navigator.userAgent.indexOf('Android') != -1 || navigator.userAgent.indexOf('Linux') != -1,
        /**
         * [urlParam 获取url中的参数]
         * @param  {[type]} param [要获取的参数key]
         * @return {[type]}       [description]
         */
        urlParam: function(param) {
            var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)'),
                r = window.location.search.substr(1).match(reg);
            return r != null ? decodeURIComponent(r[2]) : null;
        },
        /**
         * [getCookie 获取cookie]
         * @param  {[type]} name [要获取的cookie key]
         * @return {[type]}      [description]
         */
        getCookie: function(name) {
            var arr = [],
                reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            return (arr = document.cookie.match(reg)) ? arr[2] : null;
        },
        /**
         * [ajaxForJson 简单包装的json ajax]
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
            var xhr,
                _async = typeof(async) == 'undefined' || async;
            try {
                xhr = new XMLHttpRequest(); //直接创建
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP"); //IE高版本创建XMLHTTP
                } catch (e) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP
                }
            }
            xhr.open(type, url, _async);
            //指定参数为json
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(data);
            //指定响应函数
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var jsonData = JSON.parse(xhr.responseText)
                    var _status = xhr.status;
                    if (_status >= 200 && _status < 300 || _status === 304) {
                        //成功
                        succFun(jsonData);
                    } else {
                        //失败
                        failFun(jsonData);
                    }
                }
            };
        },
        /**
         * [ajax 可链式调用的ajax，功能较完善]
         * @param  {[type]} options [配置对象，可配置各种参数]
         * @return {[type]}         [description]
         */
        ajax: function(options) {
            //默认参数
            var _options = {
                async: true, //是否异步
                contentType: 'application/json; charset=utf-8', //head编码方式，默认json
                jsonForce: true //是否强制要求返回格式为json
            };
            var xhr;
            //覆盖默认参数对象
            if (Object.prototype.toString.call(options) == '[object Object]') {
                for (var pname in options) {
                    _options[pname] = options[pname];
                }
            }
            //生成xhr对象
            try {
                xhr = new XMLHttpRequest(); //直接创建
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP"); //IE高版本创建XMLHTTP
                } catch (e) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP
                }
            }
            var doAjax = function(url, data, method) {
                //开始执行ajax
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        //执行always里面的函数
                        for (var i = 0, l = main.alwaysCallbacks.length; i < l; i++) {
                            main.alwaysCallbacks[i](xhr.responseText, xhr);
                        }
                        //返回结果转换为json
                        var resJson;
                        try {
                            resJson = JSON.parse(xhr.responseText || null);
                        } catch (e) {
                            resJson = undefined;
                        }
                        var status = xhr.status;
                        if (status < 200 || (status >= 300 && status != 304) || (_options.jsonForce && typeof(resJson) === 'undefined')) {
                            //执行errCallbacks里面的函数
                            for (var i = 0, l = main.errCallbacks.length; i < l; i++) {
                                main.errCallbacks[i](xhr.responseText, xhr);
                            }
                        } else {
                            //执行sucCallbacks里面的函数
                            for (var i = 0, l = main.sucCallbacks.length; i < l; i++) {
                                main.sucCallbacks[i](resJson, xhr);
                            }
                        }
                    }
                }
                xhr.open(method, url, _options.async);
                //如果是post要改变头
                method === "POST" && xhr.setRequestHeader("Content-Type", _options.contentType);
                xhr.send(data || null);
            }
            var main = {
                xhr: xhr,
                sucCallbacks: [],
                errCallbacks: [function(err) { console.error('responseText:' + err) }],
                alwaysCallbacks: [],
                options: _options,
                get: function(url, data) {
                    doAjax(url, data, 'GET');
                    return main;
                },
                post: function(url, data) {
                    doAjax(url, data, 'POST');
                    return main;
                }
            };
            /**
             * 设置多个请求头
             * @param  {object} headers
             */
            main.headers = function(headers) {
                if (Object.prototype.toString.call(headers) === '[object Object]') {
                    for (var name in headers) {
                        console.log(name + ' ' + headers[name]);
                        console.log(xhr)
                        xhr.setRequestHeader(name, headers[name]);
                    }
                }
            };
            /**
             * 设置前置处理方法
             * @param  {Function} callback
             */
            main.before = function(callback) {
                typeof(callback) === 'function' && callback(main.xhr);
                return main;
            };
            /**
             * 分别是成功、失败、完成的回调函数
             * @param  {Function} callback [description]
             */
            main.suc = function(callback) {
                typeof(callback) === 'function' && main.sucCallbacks.push(callback);
                return main;
            };
            main.err = function(callback) {
                typeof(callback) === 'function' && main.errCallbacks.push(callback);
                return main;
            };
            main.always = function(callback) {
                typeof(callback) === 'function' && main.alwaysCallbacks.push(callback);
                return main;
            };
            return main;
        },
        /**
         * [add 两数相加，防止出现0.1+0.7==>0.79999999999]
         * @param {[type]} a [description]
         * @param {[type]} b [description]
         */
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
        /**
         * [scrollIntoView 自动移动到可视区域，如果是IOS直接滚，如果是android，已唤出输入法就直接滚否则要监听onresize事件,注意IE不支持outerHeight]
         * @param  {[type]} dom [base dom]
         * @return {[type]}     [description]
         */
        scrollIntoView: function(dom) {
            if ((navigator.userAgent.indexOf('Android') == -1 && navigator.userAgent.indexOf('Linux') == -1) || (document.body.offsetHeight < window.outerHeight)) {
                dom.scrollIntoView(true);
            } else {
                window.onresize = function() {
                    dom.scrollIntoView(true);
                }
            }
        },
        /**
         * [fullPath 获取url全路径，即最后一个/之前的所有]
         * @return {[type]} [description]
         */
        fullPath: function() {
            var e = location.href,
                i = e.lastIndexOf('/');
            return e.substring(0, i + 1);
        },
        /**
         * [showLoading work with hideLoading() not good enough]
         * @param  {[type]} txt  [description]
         * @param  {[type]} icon [description]
         * @return {[type]}      [description]
         */
        showLoading: function(txt,icon) {
            var id = 'id_dataLoading',
                _txt = txt || '加载中…',
                _icon = icon || 'https://o9xctjw8r.qnssl.com/loading2.gif';
            if (document.getElementById(id)) {
                return;
            }
            var load = document.createElement('div');
            load.id = id;
            load.style.textAlign = 'center';
            load.style.padding = '10px';
            load.style.backgroundColor = '#fff';
            load.innerHTML = '<img src="'+_icon+'">&nbsp;&nbsp;' + _txt;
            document.body.appendChild(load);
            setTimeout(function() {
                util.hideLoading();
            }, 30000);
        },
        /**
         * [hideLoading depend on showLoading()]
         * @return {[type]} [description]
         */
        hideLoading: function() {
            var load = document.getElementById('id_dataLoading');
            if (load) {
                document.body.removeChild(load);
            }
        },
        /**
         * [animateLeft move animate by js]
         * @param  {[type]}   dom   [move dom]
         * @param  {[type]}   left  [style left]
         * @param  {[type]}   speed [move time by ms]
         * @param  {Function} cb    [callback after animate finish]
         * @return {[type]}         [description]
         */
        animateLeft: function(dom, left, speed, cb) {
            if (util.lock.animateLeft_canMove) {
                util.lock.animateLeft_canMove = false;
                var _speed = speed || 100,
                    _cb = cb || function() {},
                    i = 0, //记录移动次数
                    ms = 40, //移动频率,ms动一次
                    domLeft = +dom.style.left.replace('px', '') || 0, //当前左侧坐标
                    tap = Math.floor(_speed / ms), //一共动几次
                    skip = (left - domLeft) / tap; //一次动的位移
                var s = setInterval(function() { //模拟动画
                    if (i < tap) {
                        i++;
                        dom.style.left = domLeft + i * skip + 'px';
                    } else {
                        dom.style.left = left + 'px'; //容错，保证最后是在正确位置上
                        util.lock.animateLeft_canMove = true;
                        _cb();
                        clearInterval(s);
                        s = null;
                    }
                }, ms);
            }
        },
        /**
         * [bannerMove touchmove banner depend on functon animateLeft()]
         * @param  {[type]}   dom [the base dom]
         * @param  {Function} cb  [callback pass in animateLeft()]
         * @param  {[type]}   w   [width of a banner]
         * @return {[type]}       [description]
         */
        bannerMove: function(dom, cb, w) {
            var o = {
                    w: w || document.body.offsetWidth, //一个banner宽度
                    sX: 0, //最开始的触点x坐标
                    domX: 0 //最开始dom的x坐标
                },
                _cb = cb || function() {}, //完成后的回调
                handle = {
                    move: function(e) {
                        var baseX = e.changedTouches[0].clientX;
                        dom.style.left = (o.domX + baseX - o.sX) + 'px';
                    },
                    end: function(e) {
                        if (!util.lock.bannerMove_canTouch) {
                            util.lock.bannerMove_canTouch = true;
                            var finalLeft = o.sX > e.changedTouches[0].clientX ? (o.domX - o.w) : (o.domX + o.w);
                            util.animateLeft(dom, finalLeft, 100, _cb);
                        }
                        dom.removeEventListener('touchmove', handle.move);
                        dom.removeEventListener('touchend', handle.end);
                    },
                    start: function(e) {
                        if (util.lock.bannerMove_canTouch && util.lock.animateLeft_canMove) {
                            util.lock.bannerMove_canTouch = false;
                            o.sX = e.changedTouches[0].clientX;
                            o.domX = +dom.style.left.replace('px', '') || 0;
                            dom.addEventListener('touchmove', handle.move);
                            dom.addEventListener('touchend', handle.end);
                        }
                    }
                };
            dom.addEventListener('touchstart', handle.start);
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
