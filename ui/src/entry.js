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
    this.type = type || 'default'; //样式参数
    this.maskId = _name + 'Mask'; //蒙版id
    this.txtId = _name + 'Txt'; //数据展示区的id
    this.toastId = _name + 'Toast'; //toast展示区id
    var styleId = this.type + _name; //style中class前缀
    if (!document.getElementById(styleId)) { //防止重复添加
      var x = document.createElement('div'),
        arrStyle = [],
        styles = this.styles = { //样式列表
          mask: { //蒙版
            "id": 'mask',
            "default": '{position: fixed;z-index: 9998;top: 0;right: 0;bottom: 0;left: 0;opacity: .4;background-color: #000;filter: alpha(opacity=40);}',
            "weui": '{position: fixed;z-index: 9998;top: 0;right: 0;bottom: 0;left: 0;background:rgba(0,0,0,0.6)}'
          },
          main: { //数据展示区
            "id": 'main',
            "default": '{font-family: "Microsoft Yahei";position: fixed;z-index: 9999;top: 200px;right: 0;left: 0;box-sizing: border-box;width: 300px;margin: auto;padding: 14px;text-align: right;color: #333;border-radius: 3px;background-color: #fff;}',
            "weui": '{position: fixed;z-index: 9999;top: 50%;left: 50%;-webkit-transform:translate(-50%, -50%);transform: translate(-50%, -50%);box-sizing: border-box;width: 80%;max-width:300px;text-align: center;border-radius: 3px;background-color: #fff;}'
          },
          tit: { //标题
            "id": 'tit',
            "default": '{font-size: 20px;font-weight: normal;line-height: 36px;margin: 0;padding-bottom: 10px;text-align: left;color: #333;border-bottom: #e0e0e0 1px solid;}',
            "weui": '{font-weight: 400;font-size: 18px;padding: 1.3em 1.6em 0.5em;}'
          },
          close: { //关闭的×
            "id": 'close',
            "default": '{font-size: 24px;font-weight: 600;position: absolute;top: 6px;right: 14px;cursor: pointer;color: #bababa;}',
            "weui": '{display:none;}'
          },
          txt: { //文案
            "id": 'txt',
            "default": '{font-size: 14px;margin: 0;padding: 10px;text-align: left;}',
            "weui": '{padding: 0 1.6em 0.8em;min-height: 40px;font-size: 15px;line-height: 1.3;word-wrap: break-word;word-break: break-all;color: #999;}'
          },
          btnWrap: { //按钮包裹
            "id": 'btnWrap',
            "default": '{background:#efefef;}',
            "weui": '{position: relative;line-height: 48px;font-size: 18px;display: -webkit-box;display: -webkit-flex;display: flex;}.btnWrapweui' + this.name + '::after{content: "";position: absolute;left: 0;top: 0;right: 0;height: 1px;border-top: 1px solid #D5D5D6;color: #D5D5D6;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}'
          },
          btn: { //按钮
            "id": 'btn',
            "default": '{font-size: 14px;line-height: 32px;min-width: 70px;margin: 10px 4px;cursor: pointer;text-align: center;color: #333;border: #e0e0e0 1px solid;border-radius: 3px;background-color: #fff;}',
            "weui": '{display: block;-webkit-box-flex: 1;-webkit-flex: 1;flex: 1;color: #353535;text-decoration: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);position: relative;}.btnweui' + this.name + '::after{content: "";position: absolute;right: 0;top: 0;width: 1px;bottom: 0;border-left: 1px solid #D5D5D6;color: #D5D5D6;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);transform: scaleX(0.5);}.btnweui' + this.name + '.act{color:#3CC51F;}.btnweui' + this.name + '.act::after{display:none;}'
          },
          toast: { //toast
            "id": 'toast',
            "default": '{background-color:#333;position:fixed;top:0;width:100%;line-height:20px;text-align:center;padding:20px;color:#fff;z-index:9999;}',
            "warn": '{background-color:#f60;position:fixed;top:0;width:100%;line-height:20px;text-align:center;padding:20px;color:#fff;z-index:9999;}',
            "weui": '{position: fixed;z-index: 9999;width: 6em;min-height: 3em;top: 180px;left: 50%;margin-left: -3em;background: rgba(40, 40, 40, 0.75);text-align: center;border-radius: 5px;color: #FFFFFF;font-size:18px;padding:1.5em .5em;}'
          }
        };
      //为了兼容ie8，慎动！！！
      for (var key in styles) {
        arrStyle.push('.' + styles[key].id + styleId + (styles[key][this.type] || styles[key]['default']));
      }
      x.innerHTML = 'x<style id="' + styleId + '">' + arrStyle.join('') + '</style>';
      document.getElementsByTagName('head')[0].appendChild(x.lastChild);
    }
  };
  UiZldl.prototype = {
    loading: false,
    isIE8: navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0",
    build: function(txt, title, btns, hideClose, actNo) {
      var self = this,
        id = self.txtId,
        _styles = self.styles,
        styleId = self.type + self.name;
      if (document.getElementById(id)) {
        console.log(id, 'already exist!');
        return;
      }
      var _txt = txt || '',
        _title = title ? ('<div class="' + _styles.tit.id + styleId + '">' + title + '</div>') : '',
        _close = hideClose ? '' : '<span class="' + _styles.close.id + styleId + '">×</span>',
        _btns = btns || [],
        _actNo = actNo || 0,
        mask = document.createElement('div'),
        txt = document.createElement('div'),
        strHtml = _title + _close + '<p class="' + _styles.txt.id + styleId + '">' + _txt + '</p>';
      if (_btns.length !== 0) {
        var btnArr = [];
        for (var i = 0; i < _btns.length; i++) {
          btnArr.unshift('<a href="javascripit:;" class="' + _styles.btn.id + styleId + (i == _actNo ? ' act' : '') + '">' + _btns[i] + '</a>')
        }
        strHtml += '<div class="' + _styles.btnWrap.id + styleId + '">' + btnArr.join('') + '</div>';
      }
      mask.id = self.maskId;
      mask.className = _styles.mask.id + styleId;
      txt.id = id;
      txt.className = _styles.main.id + styleId
      txt.innerHTML = strHtml;
      document.body.appendChild(mask);
      document.body.appendChild(txt);
      if (!hideClose) {
        document.getElementById(id).querySelector('.' + _styles.close.id + styleId).onclick = function() {
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
        btns = document.getElementById(this.txtId).querySelectorAll('a');
      btns[0].onclick = function(e) {
        e.preventDefault();
        _callback();
        self.remove();
      };
    },
    confirm: function(txt, fun1, fun2, title, btns) {
      var self = this;
      self.build(txt, title || '提示', btns || ['确定', '取消']);
      var _fun1 = fun1 || function() {},
        _fun2 = fun2 || function() {},
        btns = document.getElementById(self.txtId).querySelectorAll('a');
      btns[0].onclick = function(e) {
        e.preventDefault();
        _fun1();
        self.remove();
      };
      btns[1].onclick = function(e) {
        e.preventDefault();
        _fun2();
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
        _type = type || this.type,
        _max = _delay,
        _speed = speed || 20;
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
