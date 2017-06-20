! function() {
    "use strict ";
    var PLUGINNAME = "uiZldl";
    var NEWNAME = "uiZldl";
    var STYLE = '';
    var styleObj = {
        mask: {
            'position': 'fixed',
            'top': 0,
            'right': 0,
            'bottom': 0,
            'left': 0,
            'background': 'rgba(50,50,50,.7)',
            'z-index': 9999
        },
        wrap: {
            'display': 'table',
            'position': 'relative',
            'min-width': '200px',
            'max-width': '360px',
            'margin': '200px auto 0',
            'padding': '40px 30px',
            'color': '#333',
            'background': '#ffffff'
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
            'position': 'absolute',
            'right': '10px',
            'font-size': '22px',
            'top': 0,
            'color': '#999',
            'text-decoration': 'none'
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
    //ie8 mask
    arrStyle.push('@media \0screen{.' + PLUGINNAME + '-mask{background:#333;filter:Alpha(opacity=70);}}');
    var HTML = '<div class="' + PLUGINNAME + '-mask"><div class="' + PLUGINNAME + '-wrap"><div class="' + PLUGINNAME + '-top">弹窗标题</div><div class="' + PLUGINNAME + '-txt">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div><div class="' + PLUGINNAME + '-foot"><a href="javascript:;" class="' + PLUGINNAME + '-btn0">确定</a><a href="javascript:;" class="' + PLUGINNAME + '-btn1">取消</a></div><a href="javascript:;" class="' + PLUGINNAME + '-x">×</a></div></div>';
    if (!document.getElementById(PLUGINNAME)) { //防止重复添加
        var domTmp = document.createElement('div');
        //为了兼容ie8，别嫌奇怪
        domTmp.innerHTML = 'x<style id="' + PLUGINNAME + 'Style">' + arrStyle.join('') + '</style>';
        document.getElementsByTagName('head')[0].appendChild(domTmp.lastChild);
        var container = document.createElement('div');
        container.style.display = 'none';
        container.id = container.className = PLUGINNAME;
        container.innerHTML = HTML;
        document.body.appendChild(container);
    };
    var _mask = container.children[0],
        _wrap = _mask.children[0],
        _foot = _wrap.children[2];
    var prevDefault = function(e) {
        var e = e || window.event;
        (e.preventDefault) ? e.preventDefault(): e.returnValue = false;
    };
    var ui = {
        doms: {
            container: container,
            mask: _mask,
            wrap: _wrap,
            top: _wrap.children[0],
            txt: _wrap.children[1],
            foot: _foot,
            x: _wrap.children[3],
            btn0: _foot.children[0],
            btn1: _foot.children[1]
        },
        show: function() {
            ui.doms.container.style.display = "block";
        },
        hide: function() {
            ui.doms.container.style.display = "none";
        },
        alert: function(txt, callback, tit) {
            var _callback = typeof callback === "function " ? callback : function() {},
                _dom = ui.doms;
            _dom.txt.innerHTML = txt || "";
            _dom.top.innerHTML = tit || "提示";
            _dom.btn1.style.display = "none";
            _dom.btn0.onclick = function(e) {
                prevDefault(e)
                _callback();
                ui.hide();
            };
            ui.show();
        },
        confirm: function(txt, fn1, fn2, tit) {
            var _fn1 = typeof fn1 === "function " ? fn1 : function() {},
                _fn2 = typeof fn2 === "function " ? fn2 : function() {},
                _dom = ui.doms;
            _dom.txt.innerHTML = txt || "";
            _dom.top.innerHTML = tit || "提示 ";
            _dom.btn0.onclick = function(e) {
                prevDefault(e)
                _fn1();
                ui.hide();
            };
            _dom.btn1.onclick = function(e) {
                prevDefault(e)
                _fn2();
                ui.hide();
            };
            ui.show();
        }
    };
    ui.doms.x.onclick = function(e) {
        prevDefault(e)
        ui.hide();
    };
    window.ui = ui;
}()
