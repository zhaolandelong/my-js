/**
 * 2017.01.31 by zhaolandelong
 * zhaolandelong@163.com
 * https://github.com/zhaolandelong
 * friendly to ie8+ and totaly native
 */
! function() {
  "use strict";

  var Pagination = function(options) {
    var _options = typeof(options)=='object'?options:{};
    this.options = {
      id: "pagination", //主id
      item: 7, //最大item数
      prev: "上一页",
      next: "下一页",
      styleId: "paginationZldl" //style标签的id，防止重复添加
    };
    for (var key in this.options) {
      if(_options[key]){
        this.options[key] = _options[key];
      }
    }
    this.num = 1; //当n很小时的item数
    this.mid = Math.round(this.options.item / 2); //中位数
    this.maxpage = 1; //最大页码
    this.current = 1; //当前页码
    this.doms = {
      wrap: document.getElementById(this.options.id), //父dom
      dPre: null, //上一页
      dNex: null, //下一页
      dLdot: null, //左省略号
      dRdot: null, //右省略号
      dPage: null //页码
    };
    this.callback = function(n) {
      console.log('turn to page', n);
    };
  };
  Pagination.prototype = {
    pageTo: function(n) { //翻页执行的方法
      this.callback(n);
      this.rend(n);
    },
    rend: function(n) { //渲染dom
      var _num = this.num,
        _max = this.maxpage,
        mid = this.mid,
        doms = this.doms,
        dPage = doms.dPage; //页码
      for (var i = 0, l = _num, tmp, txt; i < l; i++) {
        tmp = dPage[i];
        switch (i) {
          case 0: //第一个
            txt = 1;
            break;
          case l - 1: //最后一个
            txt = _max;
            break;
          default: //其他
            if (n <= mid) { //比较小时
              txt = i + 1;
            } else if (n >= _max - mid + 1) { //比较大时
              txt = _max - _num + i + 1;
            } else { //适中时
              txt = n - mid + i + 1;
            }
            tmp.innerHTML = txt
        }
        txt == n ? addClass(tmp, 'disabled') : rmClass(tmp, 'disabled');
      }
      n == 1 ? addClass(doms.dPre, 'disabled') : rmClass(doms.dPre, 'disabled'); //是否第一页
      n == _max ? addClass(doms.dNex, 'disabled') : rmClass(doms.dNex, 'disabled'); //是否最后一页
      if (_max > _num) { //省略号
        dPage[1].innerHTML == 2 ? addClass(doms.dLdot, 'disabled') : rmClass(doms.dLdot, 'disabled');
        dPage[_num - 2].innerHTML == _max - 1 ? addClass(doms.dRdot, 'disabled') : rmClass(doms.dRdot, 'disabled');
      }
    },
    init: function(maxpage, callback) { //初始化
      var self = this,
        doms = self.doms,
        _wrap = doms.wrap;
      if (!_wrap) {
        console.warn('如要添加分页，请在html中加入id为 ' + self.options.id + ' 的div');
        return;
      }
      console.log('pagination baseon ' + self.options.id + ' initialization success!');
      //为了兼容ie8，别嫌奇怪
      if (!document.getElementById(self.styleId)) { //防止重复添加
        var domTmp = document.createElement('div');
        domTmp.innerHTML = 'x<style id="paginationStyleZldl">.pagination-zldl{-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;margin:0 auto;text-align:center;color:#1e1e1e;line-height:18px;font-size:0}.pagination-zldl>span{display:inline-block;box-sizing:border-box;cursor:pointer;font-size:14px;background:#f0f0f0;border:1px solid #d9d9d9;padding:10px 15px;margin:0 3px}.pagination-zldl>.page.disabled{color:#4bbd73;background:0 0;border:none}.pagination-zldl>.next.disabled,.pagination-zldl>.prev.disabled{color:#cfcfcf;border:1px solid #dcdcdc}.pagination-zldl>.ldot,.pagination-zldl>.rdot{border:none;background:0 0}.pagination-zldl>.ldot.disabled,.pagination-zldl>.rdot.disabled{display:none}</style>';
        document.getElementsByTagName('head')[0].appendChild(domTmp.lastChild);
      }
      _wrap.className = 'pagination-zldl';
      if (typeof(maxpage) == 'number') {
        if (maxpage <= 1) {
          _wrap.style.display = 'none';
          return;
        } else {
          _wrap.style.display = 'block';
          self.maxpage = maxpage;
        }
      } else {
        console.warn('the 1st argument in init must be a number!');
        return;
      }
      if (callback && typeof(callback) == 'function') {
        self.callback = callback;
      } else {
        console.warn('the 2nd argument in init must be a function!');
        return;
      }
      var _num = self.num = self.options.item > maxpage ? maxpage : self.options.item;
      var domArr = ['<span class="prev disabled">' + self.options.prev + '</span><span class="page disabled">1</span><span class="ldot disabled"> … </span>'];
      for (var i = 1, tempTxt; i < _num; i++) {
        tempTxt = i + 1;
        if (i == _num - 1) {
          var show = ' disabled';
          if (maxpage > _num) {
            tempTxt = maxpage;
            show = '';
          }
          domArr.push('<span class="rdot' + show + '"> … </span>');
        }
        domArr.push('<span class="page">' + tempTxt + '</span>');
      }
      domArr.push('<span class="next">' + self.options.next + '</span>');
      _wrap.innerHTML = domArr.join('');
      doms.dPre = _wrap.querySelector('.prev'); //上一页
      doms.dNex = _wrap.querySelector('.next'); //下一页
      doms.dLdot = _wrap.querySelector('.ldot'); //左省略号
      doms.dRdot = _wrap.querySelector('.rdot'); //右省略号
      doms.dPage = _wrap.querySelectorAll('.page'); //页码

      _wrap.onclick = function(e) {
        var e = e || window.event,
          target = e.target || e.srcElement; //兼容ie8
        switch (target.className) {
          case 'page':
            if (self.current != +target.innerHTML) {
              self.pageTo(self.current = +target.innerHTML);
            }
            break;
          case 'prev':
            if (self.current > 1) {
              self.pageTo(--self.current);
            }
            break;
          case 'next':
            if (self.current < self.maxpage) {
              self.pageTo(++self.current);
            }
            break;
        }
      }
    }
  };
  var hasClass = function(dom, cn) { //是否有class
    return dom.nodeType === 1 && (" " + dom.className + " ").replace(/\s+/g, " ").indexOf(" " + cn + " ") !== -1;
  };
  var addClass = function(dom, cn) { //添加class
    hasClass(dom, cn) || (dom.className = dom.className + " " + cn);
  };
  var rmClass = function(dom, cn) { //移除class
    hasClass(dom, cn) && (dom.className = (" " + dom.className).replace(" " + cn, "").replace(/(^\s*)/g, ""));
  };
  "object" == typeof exports ? module.exports = Pagination : "function" == typeof define && (define.cmd || define.amd) ? define(function() {
    return Pagination
  }) : window.Pagination = Pagination;
}()
