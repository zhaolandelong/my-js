/**
 * option为基本数据存放对象其中
 *maskId-蒙版id，与样式挂钩
 *txtId-主体id，与样式挂钩
 *scriptName-文件名，用来提取参数，参数可改变暴露的对象name（默认为ui）
 */
(function() {
    var ui = {
        option: {
            "name": "ui",
            "maskId": "uiDialogMask",
            "txtId": "uiDialogTxt",
            "toastId": "uiDialogToast",
            "scriptName": "dialog-zldl.js"
        },
        isIE8: navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0",
        style: function(type) { //样式列表
            var mid = ui.option.maskId,
                tid = ui.option.txtId,
                tsid = ui.option.toastId,
                x = document.createElement('div'),
                dialogStyle = {
                    "default": 'x<style>#' + mid + '{position: fixed; z-index: 9998; top: 0; right: 0; bottom: 0; left: 0; opacity: .4; background-color: #000; filter: alpha(opacity=40);} #' + tid + '{font-family: "Microsoft Yahei"; position: fixed; z-index: 9999; top: 100px; right: 0; left: 0; box-sizing: border-box; width: 300px; margin: auto; padding: 14px; text-align: right; color: #333; border-radius: 3px; background-color: #fff;} #' + tid + ' > h1{font-size: 20px; font-weight: normal; line-height: 36px; margin: 0; padding-bottom: 10px; text-align: left; color: #333; border-bottom: #e0e0e0 1px solid;} #' + tid + ' > span{font-size: 24px; font-weight: 600; position: absolute; top: 6px; right: 14px; cursor: pointer; color: #bababa;} #' + tid + ' > p{font-size: 14px; margin: 0; padding: 10px; text-align: left;} #' + tid + ' > button{font-size: 14px; line-height: 32px; min-width: 70px; margin: 10px 4px; cursor: pointer; text-align: center; color: #333; border: #e0e0e0 1px solid; border-radius: 3px; background-color: #fff;} #' + tid + ' > button.active{color: #fff; border: none; background-color: #2797ef;}#' + tsid + '{position:fixed;top:0;width:100%;line-height:20px;text-align:center;padding:20px;color:#fff;z-index:9999;}</style>'
                };
            //为了兼容ie8，慎动！！！
            x.innerHTML = dialogStyle['default'];
            document.getElementsByTagName('head')[0].appendChild(x.lastChild);
        },
        getParam: function(param, url) {
            var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)'),
                r = url.match(reg);
            return r != null ? decodeURIComponent(r[2]) : null;
        },
        build: function(txt, title, btns) {
            if (document.getElementById(ui.option.txtId)) {
                console.log(ui.option.txtId, 'already exist!');
                return;
            }
            var _txt = txt || '',
                _title = title || '提示',
                _btns = btns || ['确定'],
                mask = document.createElement('div'),
                txt = document.createElement('div'),
                strHtml = '<h1>' + _title + '</h1><span>×</span><p>' + _txt + '</p>';
            for (var i = 0; i < _btns.length; i++) {
                strHtml += '<button' + (i == 0 ? ' class="active" ' : '') + '>' + _btns[i] + '</button>';
            }
            mask.setAttribute('id', ui.option.maskId);
            txt.setAttribute('id', ui.option.txtId);
            txt.innerHTML = strHtml;
            document.body.appendChild(mask);
            document.body.appendChild(txt);
            document.getElementById(ui.option.txtId).querySelector('span').onclick = function() {
                ui.remove();
            }
        },
        remove: function() {
            document.body.removeChild(document.getElementById(ui.option.maskId));
            document.body.removeChild(document.getElementById(ui.option.txtId));
        },
        alert: function(txt, callback, title, btns) {
            ui.build(txt, title, btns);
            var _callback = callback || function() {},
                btns = document.getElementById(ui.option.txtId).querySelectorAll('button');
            btns[0].onclick = function() {
                _callback();
                ui.remove();
            };
        },
        confirm: function(txt, sucFun, failFun, title, btns) {
            ui.build(txt, title, btns || ['确定', '取消']);
            var _sucback = sucFun || function() {},
                _failFun = failFun || function() {},
                btns = document.getElementById(ui.option.txtId).querySelectorAll('button');
            btns[0].onclick = function() {
                _sucback();
                ui.remove();
            };
            btns[1].onclick = function() {
                _failFun();
                ui.remove();
            };
        },
        toastType: {
            "default": "#2797ef",
            "warn": "#f00"
        },
        toast: function(txt, delay, type, speed) {
            var _delay = delay || 2000,
                _type = type || 'default',
                _max = _delay,
                _speed = speed || 80;
            if (!document.getElementById(ui.option.toastId)) {
                var toast = document.createElement('div');
                toast.setAttribute('id', ui.option.toastId);
                toast.innerHTML = txt;
                ui.isIE8 ? (toast.style.filter = 'alpha(opacity=00)') : (toast.style.opacity = 0);
                toast.style.backgroundColor = ui.toastType[_type];
                document.body.appendChild(toast);
                var fadeIn = true,
                    ie8filter, //专门记录ie8的透明度
                    a = setInterval(function() {
                        _delay -= _speed;
                        ui.isIE8 && (ie8filter = +toast.style.filter.match(/\d/g).join(''));
                        if (_delay <= _speed * 10 || _delay >= _max - _speed * 10) {
                            if (fadeIn) {
                                if (ui.isIE8) {
                                    toast.style.filter = 'alpha(opacity=' + (ie8filter + 10) + ')';
                                } else {
                                    toast.style.opacity = +toast.style.opacity + 0.1;
                                }
                                if (toast.style.opacity == 1 || ie8filter == 100) {
                                    fadeIn = false;
                                }
                            } else {
                                if (ui.isIE8) {
                                    toast.style.filter = 'alpha(opacity=' + (ie8filter - 10) + ')';
                                } else {
                                    toast.style.opacity -= 0.1;
                                }
                                if (toast.style.opacity == 0 || ie8filter == 0) {
                                    clearInterval(a);
                                    document.body.removeChild(toast);
                                }
                            }
                        }
                    }, _speed);
            } else {
                console.log('element ' + ui.option.toastId + 'has already existed!');
            }
        },
        init: function(id) {
            if ("object" == typeof exports) {
                ui.style('default');
                module.exports = ui;
            } else {
                if ("function" == typeof define && (define.cmd || define.amd)) {
                    define(function() {
                        ui.style('default');
                        return ui;
                    })
                } else {
                    //提取参数，更改主对象name，type等属性
                    var scripts = document.getElementsByTagName('script'),
                        scriptName = ui.option.scriptName,
                        temp;
                    for (var i = 0, index; i < scripts.length; i++) {
                        if ((index = scripts[i].src.indexOf(scriptName)) > 0) {
                            if (scripts[i].src.indexOf('?') > 0) {
                                var url = scripts[i].src.substr(index + scriptName.length + 1);
                                ui.getParam('name', url) && (ui.option.name = ui.getParam('name', url));
                                ui.getParam('type', url) ? ui.style(ui.getParam('type', url)) : ui.style('default');
                            } else {
                                ui.style('default');
                            }
                            break;
                        }
                    }
                    window[ui.option.name] = ui;
                }
            }
        }
    };
    console.log('is IE8:',ui.isIE8);
    ui.init();
})()
