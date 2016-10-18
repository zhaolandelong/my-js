/**
 * o为基本数据存放对象其中
 *maskId-蒙版id，与样式挂钩
 *txtId-主体id，与样式挂钩
 *scriptName-文件名，用来提取参数，参数可改变暴露的对象name（默认为ui）
 */
! function() {
    "use strict";
    var UiZldl = function(type, name) { //type-样式名 name-防止id冲突可修改前缀
        var _name = this.name = name || 'UiZldl'; //全局id的前缀，防止冲突
        this.type = this.styles[type] ? type : 'default'; //样式参数
        this.maskId = _name + 'Mask'; //蒙版id
        this.txtId = _name + 'Txt'; //数据展示区的id
        this.toastId = _name + 'Toast'; //toast展示区id
        var styleId = this.type + _name; //style中class前缀
        if (!document.getElementById(styleId)) { //防止重复添加
            var x = document.createElement('div'),
                arrStyle = [],
                styles = this.styles,
                type = this.type;
            //为了兼容ie8，慎动！！！
            for (var key in styles) {
                arrStyle.push('.' + styles[key].id + styleId + (styles[key][type] || styles[key]['default']));
            }
            x.innerHTML = 'x<style id="' + styleId + '">' + arrStyle.join('') + '</style>';
            document.getElementsByTagName('head')[0].appendChild(x.lastChild);
        }
    };
    UiZldl.prototype = {
        loading: false,
        isIE8: navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0",
        styles: {
            mask: { //蒙版
                "id": 'mask',
                "default": '{position: fixed;z-index: 9998;top: 0;right: 0;bottom: 0;left: 0;opacity: .4;background-color: #000;filter: alpha(opacity=40);}'
            },
            main: { //数据展示区
                "id": 'main',
                "default": '{font-family: "Microsoft Yahei";position: fixed;z-index: 9999;top: 200px;right: 0;left: 0;box-sizing: border-box;width: 300px;margin: auto;padding: 14px;text-align: right;color: #333;border-radius: 3px;background-color: #fff;}'
            },
            tit: { //标题
                "id": 'tit',
                "default": '{font-size: 20px;font-weight: normal;line-height: 36px;margin: 0;padding-bottom: 10px;text-align: left;color: #333;border-bottom: #e0e0e0 1px solid;}'
            },
            close: { //关闭的×
                "id": 'close',
                "default": '{font-size: 24px;font-weight: 600;position: absolute;top: 6px;right: 14px;cursor: pointer;color: #bababa;}'
            },
            txt: { //文案
                "id": 'txt',
                "default": '{font-size: 14px;margin: 0;padding: 10px;text-align: left;}'
            },
            btn: { //按钮
                "id": 'btn',
                "default": '{font-size: 14px;line-height: 32px;min-width: 70px;margin: 10px 4px;cursor: pointer;text-align: center;color: #333;border: #e0e0e0 1px solid;border-radius: 3px;background-color: #fff;}'
            },
            btnA: { //激活的按钮
                "id": 'btnA',
                "default": '{font-size: 14px;line-height: 32px;min-width: 70px;margin: 10px 4px;cursor: pointer;text-align: center;color: #fff;border: none;border-radius: 3px;background-color: #2797ef;}'
            },
            toast: { //toast
                "id": 'toast',
                "default": '{background-color:#333;position:fixed;top:0;width:100%;line-height:20px;text-align:center;padding:20px;color:#fff;z-index:9999;}',
                "warn": '{background-color:#f60;position:fixed;top:0;width:100%;line-height:20px;text-align:center;padding:20px;color:#fff;z-index:9999;}'
            }
        },
        build: function(txt, title, btns, hideClose) {
            var self = this,
                id = self.txtId,
                styles = self.styles,
                styleId = self.type + self.name;
            if (document.getElementById(id)) {
                console.warn(id, 'already exist!');
                return;
            }
            var _txt = txt || '',
                _title = title ? ('<div class="' + styles.tit.id + styleId + '">' + title + '</div>') : '',
                _close = hideClose ? '' : '<span class="' + styles.close.id + styleId + '">×</span>',
                _btns = btns || [],
                mask = document.createElement('div'),
                txt = document.createElement('div'),
                strHtml = _title + _close + '<p class="' + styles.txt.id + styleId + '">' + _txt + '</p>';
            for (var i = 0; i < _btns.length; i++) {
                strHtml += '<button class="' + (i == 0 ? styles.btnA.id : styles.btn.id) + styleId + '">' + _btns[i] + '</button>';
            }
            mask.id = self.maskId;
            mask.className = styles.mask.id + styleId;
            txt.id = id;
            txt.className = styles.main.id + styleId
            txt.innerHTML = strHtml;
            document.body.appendChild(mask);
            document.body.appendChild(txt);
            if (!hideClose) {
                document.getElementById(id).querySelector('.' + styles.close.id + styleId).onclick = function() {
                    self.remove();
                }
            }
        },
        remove: function() {
            document.body.removeChild(document.getElementById(this.maskId));
            document.body.removeChild(document.getElementById(this.txtId));
        },
        alert: function(txt, callback, title, btns) {
            var self = this;
            self.build(txt, title || '提示', btns || ['确定']);
            var _callback = callback || function() {},
                btns = document.getElementById(this.txtId).querySelectorAll('button');
            btns[0].onclick = function() {
                _callback();
                self.remove();
            };
        },
        confirm: function(txt, sucFun, failFun, title, btns) {
            var self = this;
            self.build(txt, title || '提示', btns || ['确定', '取消']);
            var _sucback = sucFun || function() {},
                _failFun = failFun || function() {},
                btns = document.getElementById(self.txtId).querySelectorAll('button');
            btns[0].onclick = function() {
                _sucback();
                self.remove();
            };
            btns[1].onclick = function() {
                _failFun();
                self.remove();
            };
        },
        showLoading: function(txt) {
            if (!this.loading) {
                var _txt = txt || '加载中，请稍后……';
                this.build(_txt, '', [], true);
                this.loading = true;
            }
        },
        hideLoading: function(callback) {
            var _cb = callback || function() {};
            if (this.loading) {
                _cb();
                this.remove();
                this.loading = false;
            }
        },
        toast: function(txt, delay, type, speed) {
            var _delay = delay || 2000,
                _type = type || 'default',
                _max = _delay,
                _speed = speed || 80;
            if (!document.getElementById(this.toastId)) {
                var toast = document.createElement('div');
                toast.id = this.toastId;
                toast.className = this.styles.toast.id + this.type + this.name;
                toast.innerHTML = txt;
                this.isIE8 ? (toast.style.filter = 'alpha(opacity=00)') : (toast.style.opacity = 0);
                // toast.style.backgroundColor = ui.toastType[_type];
                document.body.appendChild(toast);
                var fadeIn = true,
                    ie8filter, //专门记录ie8的透明度
                    a = setInterval(function() {
                        _delay -= _speed;
                        this.isIE8 && (ie8filter = +toast.style.filter.match(/\d/g).join(''));
                        if (_delay <= _speed * 10 || _delay >= _max - _speed * 10) {
                            if (fadeIn) {
                                if (this.isIE8) {
                                    toast.style.filter = 'alpha(opacity=' + (ie8filter + 10) + ')';
                                } else {
                                    toast.style.opacity = +toast.style.opacity + 0.1;
                                }
                                if (toast.style.opacity == 1 || ie8filter == 100) {
                                    fadeIn = false;
                                }
                            } else {
                                if (this.isIE8) {
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
                console.log('element ' + this.toastId + 'has already existed!');
            }
        }
    };
    "object" == typeof exports ? module.exports = UiZldl : "function" == typeof define && (define.cmd || define.amd) ? define(function() {
        return UiZldl
    }) : window.UiZldl = UiZldl;
}()
