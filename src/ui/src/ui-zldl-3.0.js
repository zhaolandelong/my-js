/**
 * 2017.06.28 by zhaolandelong
 * zhaolandelong@163.com
 * https://github.com/zhaolandelong
 * friendly to ie8+ and totally native
 */
! function() {
    "use strict ";
    var PLUGINNAME = "uiZldl";
    var ui = null;
    if (!document.getElementById(PLUGINNAME)) { //防止重复运行
        //加入dialog最外层包裹
        var domDialog = document.createElement('div');
        domDialog.className = PLUGINNAME + '-dialog';
        domDialog.innerHTML = '<div class="' + PLUGINNAME + '-mask">' +
            '<div class="' + PLUGINNAME + '-wrap">' +
            '<div class="' + PLUGINNAME + '-top"></div>' +
            '<div class="' + PLUGINNAME + '-txt"></div>' +
            '<div class="' + PLUGINNAME + '-foot">' +
            '<a href="javascript:;" class="' + PLUGINNAME + '-btn0">确定</a>' +
            '<a href="javascript:;" class="' + PLUGINNAME + '-btn1">取消</a>' +
            '</div>' +
            '<a href="javascript:;" class="' + PLUGINNAME + '-x">×</a>' +
            '</div></div>';
        document.body.appendChild(domDialog);

        //加入toast
        var domTost = document.createElement('div');
        domTost.className = PLUGINNAME + '-toast';
        document.body.appendChild(domTost);

        //加入loading
        var domLoading = document.createElement('div');
        domLoading.className = PLUGINNAME + '-loading';
        document.body.appendChild(domLoading);

        // 公用属性或方法
        var isIE8 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0";

        function prevDefault(e) {
            var e = e || window.event;
            (e.preventDefault) ? e.preventDefault(): e.returnValue = false;
        };

        function showDom(dom, display) {
            var _dis = display || 'block';
            dom.style.display !== _dis && (dom.style.display = _dis);
        };

        function hideDom(dom) {
            dom.style.display !== 'none' && (dom.style.display = 'none');
        };

        //样式
        var styleObj = {
            dialog: {
                'display': 'none',
                'position': 'relative',
                'z-index': 9999
            },
            mask: {
                'position': 'fixed',
                'top': 0,
                'right': 0,
                'bottom': 0,
                'left': 0,
                'background': 'rgba(50,50,50,.7)'
            },
            wrap: {
                'display': 'table',
                'position': 'relative',
                'min-width': '200px',
                'max-width': '360px',
                'margin': '200px auto 0',
                'padding': '40px 30px',
                'color': '#333',
                'background': '#fff'
            },
            top: {
                'display': 'none'
            },
            txt: {
                'font-size': '16px',
                'line-height': 1.5,
                'padding': ' 0 0 20px 0',
                'text-align': 'center',
                'word-break': 'break-all',
                'color': '#333'
            },
            foot: {
                'text-align': 'center'
            },
            btn0: {
                'display': 'inline-block',
                'padding': '7px 25px',
                'margin': '0 10px',
                'color': '#fff',
                'background': '#15b790',
                'font-size': '14px',
                'border': '1px solid #15b790',
                'text-decoration': 'none'
            },
            btn1: {
                'display': 'inline-block',
                'padding': '7px 25px',
                'margin': '0 10px',
                'color': '#666',
                'background': '#fff',
                'font-size': '14px',
                'border': '1px solid #eee',
                'text-decoration': 'none'
            },
            x: {
                'display': 'none'
            },
            toast: {
                'display': 'none',
                'font-size': '0.28rem',
                'position': 'fixed',
                'margin': 'auto',
                'top': '30%',
                'right': 0,
                'left': 0,
                'background': 'rgba(17,17,17,0.7)',
                'color': '#fff',
                'line-height': 1.5,
                'padding': '0.3rem',
                'width': '3rem',
                'border-radius': '0.1rem',
                'text-align': 'center',
                'word-break': 'break-all',
                'z-index': 9999
            },
            loading: {
                'display': 'none',
                'position': 'fixed',
                'margin': 'auto',
                'top': '30%',
                'right': 0,
                'left': 0,
                'border-radius': '0.08rem',
                'background': '#585e68',
                'color': '#fff',
                'line-height': 1.5,
                'padding': '.2rem',
                'width': '2rem',
                'text-align': 'center',
                'word-break': 'break-all',
                'z-index': 9999
            }
        };
        var arrStyle = [],
            tmpStyle;
        for (var k in styleObj) {
            tmpStyle = styleObj[k];
            arrStyle.push('.' + PLUGINNAME + '-' + k + '{');
            for (var sk in tmpStyle) {
                arrStyle.push(sk + ':' + tmpStyle[sk] + ';');
            }
            arrStyle.push('}');
        }
        //兼容ie8的mask
        isIE8 && arrStyle.push('@media \\0screen{.' + PLUGINNAME + '-mask{background:rgb(50,50,50);filter:Alpha(opacity=70);}}');
        //将style打入html，为了兼容ie8，别嫌奇怪
        var domTmp = document.createElement('div');
        domTmp.innerHTML = 'x<style id="' + PLUGINNAME + '">' + arrStyle.join('') + '</style>';
        document.getElementsByTagName('head')[0].appendChild(domTmp.lastChild);
        var _mask = domDialog.children[0],
            _wrap = _mask.children[0],
            _foot = _wrap.children[2];

        //主对象
        ui = {
            doms: {
                dialog: domDialog,
                mask: _mask,
                wrap: _wrap,
                top: _wrap.children[0],
                txt: _wrap.children[1],
                foot: _foot,
                x: _wrap.children[3],
                btn0: _foot.children[0],
                btn1: _foot.children[1],
                toast: domTost,
                loading: domLoading
            },
            alert: function(txt, fn, tit) {
                var _fn = typeof fn === "function " ? fn : function() {},
                    _dom = ui.doms;
                _dom.txt.innerHTML = txt || "";
                _dom.top.innerHTML = tit || "提示";
                hideDom(_dom.btn1);
                _dom.btn0.onclick = function(e) {
                    prevDefault(e)
                    _fn();
                    hideDom(_dom.dialog);
                };
                showDom(_dom.dialog);
            },
            confirm: function(txt, fn1, fn2, tit) {
                var _fn1 = typeof fn1 === "function " ? fn1 : function() {},
                    _fn2 = typeof fn2 === "function " ? fn2 : function() {},
                    _dom = ui.doms;
                _dom.txt.innerHTML = txt || "";
                _dom.top.innerHTML = tit || "提示 ";
                showDom(_dom.btn1, 'inline-block');
                _dom.btn0.onclick = function(e) {
                    prevDefault(e)
                    _fn1();
                    hideDom(_dom.dialog);
                };
                _dom.btn1.onclick = function(e) {
                    prevDefault(e)
                    _fn2();
                    hideDom(_dom.dialog);
                };
                showDom(_dom.dialog);
            },
            showLoading: function(txt) {
                var _dom = ui.doms.loading,
                    _txt = txt || '<img style="width: .35rem;height: .35rem;margin-right: .05rem; vertical-align:text-bottom;" src="' + require('./assest/loading.gif') + '" />加载中…';
                _dom.innerHTML !== _txt && (_dom.innerHTML = _txt);
                showDom(_dom);
            },
            hideLoading: function() {
                hideDom(ui.doms.loading);
            },
            toast: function(txt, delay, speed) {
                var _delay = delay || 1500,
                    _max = _delay,
                    _speed = speed || 20,
                    toastId = PLUGINNAME + 'Toast',
                    _dom = ui.doms.toast,
                    _opacity = 0, //记录透明度
                    setOpacity = function(dom, opacity) { //设置透明度
                        isIE8 ? (dom.style.filter = 'alpha(opacity=' + opacity * 10 + ')') : (dom.style.opacity = opacity / 10);
                    };
                if (_dom.style.display === 'block') { //防止多个toast同时存在
                    return;
                }
                showDom(_dom);
                _dom.innerHTML = txt;
                setOpacity(_dom, _opacity);
                var fadeIn = true, //淡入还是淡出
                    a = setInterval(function() {
                        _delay -= _speed;
                        if (_delay <= _speed * 10 || _delay >= _max - _speed * 10) {
                            _opacity += (fadeIn ? 1 : -1);
                            if (_opacity > 0 && _opacity < 10) {
                                setOpacity(_dom, _opacity);
                            } else if (fadeIn) {
                                fadeIn = false;
                            } else {
                                clearInterval(a);
                                hideDom(_dom);
                            }
                        }
                    }, _speed);
            }
        };
        ui.doms.x.onclick = function(e) {
            prevDefault(e)
            hideDom(ui.doms.dialog);
        };
    };
    module.exports = ui;
}()
