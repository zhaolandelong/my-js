/**
 * 2017.02.03 by zhaolandelong
 * zhaolandelong@163.com
 * https://github.com/zhaolandelong
 * friendly to ie8+ and totaly native
 */
! function() {
  "use strict";
  var PLUGINNAME = "uiZldl";
  var NEWNAME = "uiZldl";
  var STYLE = '@@include("../dist/style.css")';
  var HTML = '<div class="' + NEWNAME + '-mask"></div><div class="' + NEWNAME + '-dialog"><div class="' + NEWNAME + '-tit"></div><div class="' + NEWNAME + '-txt"></div><div class="' + NEWNAME + '-btnwrap"><a href="javascript:;"class="' + NEWNAME + '-btn act"></a><a href="javascript:;"class="' + NEWNAME + '-btn"></a></div><a href="javascript:;"class="' + NEWNAME + '-x">×</a></div>';
  if (!document.getElementById(NEWNAME)) { //防止重复添加
    var domTmp = document.createElement('div'),
      re = new RegExp(PLUGINNAME, 'g');
    //为了兼容ie8，别嫌奇怪
    domTmp.innerHTML = 'x<style id="' + NEWNAME + '">' + STYLE.replace(re, NEWNAME) + '</style>';
    document.getElementsByTagName('head')[0].appendChild(domTmp.lastChild);
    var wrap = document.createElement('div');
    wrap.id = wrap.className = NEWNAME;
    wrap.innerHTML = HTML;
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
      if (ui.doms.btn1.style.display === "none") {
        ui.doms.btn1.style.display = "";
      }
    },
    alert: function(txt, cb, tit, btn) {
      var _cb = typeof(cb) === "function" ? cb : function() {},
      _btn0 = ui.doms.btn0,
      _btn1 = ui.doms.btn1;
      ui.doms.txt.innerHTML = txt || "";
      ui.doms.tit.innerHTML = tit || "提示";
      _btn1.style.display = "none";
      _btn0.innerHTML = btn || "确定";
      _btn0.onclick = function(e) {
        var e = e || window.event;
        (e.preventDefault) ? e.preventDefault(): e.returnValue = false;
        _cb();
        ui.hide();
      };
      ui.show();
    },
    confirm: function(txt, fn1, fn2, tit, btns) {
      var _fn1 = typeof(fn1) === "function" ? fn1 : function() {},
        _fn2 = typeof(fn2) === "function" ? fn2 : function() {},
        _btns = btns || [],
        _btn0 = ui.doms.btn0,
        _btn1 = ui.doms.btn1;
      ui.doms.txt.innerHTML = txt || "";
      ui.doms.tit.innerHTML = tit || "提示";
      _btn0.innerHTML = _btns[0] || "取消";
      _btn1.innerHTML = _btns[1] || "确定";
      _btn0.onclick = function(e) {
        var e = e || window.event;
        (e.preventDefault) ? e.preventDefault(): e.returnValue = false;
        _fn1();
        ui.hide();
      };
      _btn1.onclick = function(e) {
        var e = e || window.event;
        (e.preventDefault) ? e.preventDefault(): e.returnValue = false;
        _fn2();
        ui.hide();
      };
      ui.show();
    }
  };
  ui.doms.x.onclick = function(e) {
    var e = e || window.event;
    (e.preventDefault) ? e.preventDefault(): e.returnValue = false;
    ui.hide();
  };
  "object" == typeof exports ? module.exports = ui : "function" == typeof define && (define.cmd || define.amd) ? define(function() {
    return ui
  }) : window.ui = ui;
}()
