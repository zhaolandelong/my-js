//纯原生无依赖，支持多个pagination
! function() {
  "use strict";

  var Pagination = function(id, num, prevTxt, nextTxt) {
    this.id = id; //主id
    this.prevTxt = prevTxt || "上一页";
    this.nextTxt = nextTxt || "下一页";
    this.maxnum = num || 7; //最大item数
    this.num = 1; //当n很小时的item数
    this.mid = Math.round(this.maxnum / 2); //中位数
    this.maxpage = 1; //最大页码
    this.current = 1; //当前页码
    this.doms = {
      wrap: document.getElementById(id), //父dom
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
        console.warn('如要添加分页，请在html中加入id为 ' + self.id + ' 的div');
        return;
      }
      console.log('pagination baseon ' + self.id + ' initialization success!');
      //为了兼容ie8，别嫌奇怪
      var domTmp = document.createElement('div');
      domTmp.innerHTML = 'x<style>.pagination-zldl{-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;margin:0 auto;padding:5px;font-size:14px;text-align:center;color:#666}.pagination-zldl>.next,.pagination-zldl>.page,.pagination-zldl>.prev{display:inline-block;box-sizing:border-box;padding:7px 13px;border:1px solid #d1d1d1;background-color:#fff;cursor:pointer;margin:0 3px}.pagination-zldl>.active{color:#fff;border:1px solid #55626d;background:#55626d}</style>'
      document.getElementsByTagName('head')[0].appendChild(domTmp.lastChild);
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
      var _num = self.num = self.maxnum > maxpage ? maxpage : self.maxnum;
      var domArr = ['<span class="prev disabled">' + self.prevTxt + '</span><span class="page disabled">1</span><span class="ldot disabled"> … </span>'];
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
      domArr.push('<span class="next">' + self.nextTxt + '</span>');
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
