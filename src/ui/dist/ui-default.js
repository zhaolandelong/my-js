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
  var STYLE = '.uiZldl{display:none}.uiZldl-dialog,.uiZldl-mask{position:fixed;right:0;left:0}.uiZldl-mask{bottom:0;opacity:.4;filter:alpha(opacity=40);z-index:9998;top:0;background-color:#000}.uiZldl-dialog{font-family:"Microsoft Yahei";z-index:9999;top:10%;box-sizing:border-box;width:80%;max-width:600px;margin:auto;padding:14px;text-align:right;color:#333;border-radius:3px;background-color:#fff}.uiZldl-tit{font-size:20px;font-weight:400;line-height:36px;margin:0;padding-bottom:10px;text-align:left;color:#333;border-bottom:#e0e0e0 1px solid}.uiZldl-x{display:inline-block;text-decoration:none;color:#999;position:absolute;top:5px;right:10px;font-size:20px}.uiZldl-txt{font-size:14px;margin:0;padding:10px;text-align:left;word-break:break-all}.uiZldl-btn{display:inline-block;text-decoration:none;font-size:14px;line-height:32px;min-width:70px;margin:10px 4px;cursor:pointer;text-align:center;color:#333;border:#e0e0e0 1px solid;border-radius:3px;background-color:#fff}.uiZldl-btn.act{color:#fff;border:none;background-color:#2797ef}';
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
    alert: function(txt, callback, tit, btn, btnswap) {
      var _callback = typeof(callback) === "function" ? callback : function() {};
      ui.doms.txt.innerHTML = txt || "";
      ui.doms.tit.innerHTML = tit || "提示";
      var _btn0 = btnswap ? ui.doms.btn1 : ui.doms.btn0,
        _btn1 = btnswap ? ui.doms.btn0 : ui.doms.btn1;
      _btn1.innerHTML = btn || "确定";
      _btn0.style.display = "none";
      _btn1.onclick = function(e) {
        e.preventDefault();
        _callback();
        ui.hide();
      };
      ui.show();
    },
    confirm: function(txt, fn1, fn2, tit, btns, btnswap) {
      var _fn1 = typeof(fn1) === "function" ? fn1 : function() {},
        _fn2 = typeof(fn2) === "function" ? fn2 : function() {},
        _btns = btns || [],
        _btn0 = btnswap ? ui.doms.btn1 : ui.doms.btn0,
        _btn1 = btnswap ? ui.doms.btn0 : ui.doms.btn1;
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
