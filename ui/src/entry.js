/**
 * 2017.02.02 by zhaolandelong
 * zhaolandelong@163.com
 * https://github.com/zhaolandelong
 * friendly to ie8+ and totaly native
 */
! function() {
  "use strict";
  var PLUGINNAME = "uiZldl";
  var STYLE = '@@include("../dist/style.css")';
  if (!document.getElementById(PLUGINNAME)) { //防止重复添加
    var domTmp = document.createElement('div'),
      re = new RegExp(PLUGINNAME, 'g');
    //为了兼容ie8，别嫌奇怪
    domTmp.innerHTML = 'x<style id="' + PLUGINNAME + '">' + STYLE.replace(re, PLUGINNAME) + '</style>';
    document.getElementsByTagName('head')[0].appendChild(domTmp.lastChild);
    var wrap = document.createElement('div');
    wrap.id = wrap.className = PLUGINNAME;
    wrap.innerHTML = '<div class="uiZldl-mask"></div><div class="uiZldl-dialog"><div class="uiZldl-tit">弹窗标题</div><div class="uiZldl-txt">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div><div class="uiZldl-btnwrap"><a href="javascript:;"class="uiZldl-btn">辅助操作</a><a href="javascript:;"class="uiZldl-btn act">主操作</a></div><a href="javascript:;"class="uiZldl-x">×</a></div>';
    document.body.appendChild(wrap);
  };
  var dialog = wrap.children[1],
    btnwrap = dialog.children[2];
  var ui = {
    doms: {
      wrap: wrap,
      mask: wrap.children[0],
      dialog: dialog,
      tit: dialog.children[0],
      txt: dialog.children[1],
      btnwrap: btnwrap,
      x: dialog.children[3],
      btn0: btnwrap.children[0],
      btn1: btnwrap.children[1]
    },
    show: function() {
      ui.doms.wrap.style.display = "block";
    },
    hide: function() {
      ui.doms.wrap.style.display = "none";
      if (ui.doms.btn0.style.display === "none") {
        ui.doms.btn0.style.display = "";
      }
    },
    alert: function(txt, callback, tit, btn) {
      var _callback = typeof(callback) === "function" ? callback : function() {};
      ui.doms.txt.innerHTML = txt || "";
      ui.doms.tit.innerHTML = tit || "提示";
      ui.doms.btn1.innerHTML = btn || "确定";
      ui.doms.btn0.style.display = "none";
      ui.doms.btn1.onclick = function(e) {
        e.preventDefault();
        _callback();
        ui.hide();
      };
      ui.show();
    },
    confirm: function(txt, fun1, fun2, tit, btns) {
      var _fun1 = typeof(fun1) === "function" ? fun1 : function() {},
        _fun2 = typeof(fun2) === "function" ? fun2 : function() {},
        _btns = btns || [];
      ui.doms.txt.innerHTML = txt || "";
      ui.doms.tit.innerHTML = tit || "提示";
      ui.doms.btn0.innerHTML = _btns[0] || "确定";
      ui.doms.btn1.innerHTML = _btns[1] || "取消";
      ui.doms.btn0.onclick = function(e) {
        e.preventDefault();
        _fun1();
        ui.hide();
      };
      ui.doms.btn1.onclick = function(e) {
        e.preventDefault();
        _fun2();
        ui.hide();
      };
      ui.show();
    }
  };
  "object" == typeof exports ? module.exports = ui : "function" == typeof define && (define.cmd || define.amd) ? define(function() {
    return ui
  }) : window.ui = ui;
}()
