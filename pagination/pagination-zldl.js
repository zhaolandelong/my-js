//纯原生无依赖
! function() {
    "use strict";
    //为了兼容ie8，别嫌奇怪
    var domTmp = document.createElement('div');
    domTmp.innerHTML = 'x<style>#pagination{-moz-user-select: none;-o-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;margin: 0 auto; padding: 5px; font-size: 14px; text-align: center;color: #666;} #pagination>.page,#pagination>.prev,#pagination>.next{display: inline-block; box-sizing: border-box; padding: 7px 13px; border: 1px solid #d1d1d1; background-color: #ffffff; cursor: pointer; margin: 0 3px} #pagination>.active{color: #fff; border: 1px solid #55626d; background: #55626d;}</style>'
    document.getElementsByTagName('head')[0].appendChild(domTmp.lastChild);
    var p = {
        num: 1, //当前item数
        maxnum: 6, //最大item数
        maxpage: 1, //最大页码
        current: 1, //当前页码
        dom: document.getElementById('pagination'), //父dom
        callback: function() {},
        pageTo: function(n) {
            console.log('turn to page', n);
            p.callback(n);
            p.rend(n);
        },
        rend: function(n) {
            var _num = p.num,
                _max = p.maxpage,
                mid = Math.round(p.maxnum / 2),
                start = 2,
                dom = p.dom, //父dom
                domPrev = dom.querySelector('.prev'), //上一页
                domNext = dom.querySelector('.next'), //下一页
                domLdot = dom.querySelector('.ldot'), //左省略号
                domRdot = dom.querySelector('.rdot'), //右省略号
                domPage = dom.querySelectorAll('.page'); //页码
            domPrev.style.display = n == 1 ? 'none' : 'inline-block';
            domNext.style.display = n == _max ? 'none' : 'inline-block';
            for (var i = 0, l = _num, tmp, tmpClass, txt; i < l; i++) {
                tmp = domPage[i];
                if (i == 0) {
                    txt = i + 1;
                } else if (i == l - 1) {
                    txt = _max;
                } else {
                    if (n <= mid) { //比较小时
                        txt = i + 1;
                    } else if (n >= _max - mid + 1) { //比较大时
                        txt = _max - _num + i + 1;
                    } else { //适中时
                        txt = n - mid + i + 1;
                    }
                }
                tmp.innerHTML = txt;
                tmpClass = tmp.className;
                tmpClass.indexOf('active') != -1 ? (txt != n && (tmp.className = tmpClass.replace(' active', ''))) : (txt == n && (tmp.className = tmpClass + ' active'));
            }
            if (_max > _num) { //省略号
                domLdot.style.display = domPage[1].innerHTML == 2 ? 'none' : '';
                domRdot.style.display = domPage[_num - 2].innerHTML == _max - 1 ? 'none' : '';
            }
        },
        init: function(maxpage, callback) {
            console.log('pagination initialization success!');
            var _pagination = p.dom;
            if (!_pagination) {
                console.log('如要添加分页，请在html中加入id为pagination的div');
                return;
            }
            if (typeof(maxpage) == 'number') {
                if (maxpage <= 1) {
                    _pagination.style.display = 'none';
                    console.log('less than 1');
                    return;
                } else {
                    _pagination.style.display = 'block';
                    p.maxpage = maxpage;
                    console.log('more than 1');
                }
            } else {
                console.log('maxpage must be number!');
            }
            if (callback && typeof(callback) == 'function') {
                p.callback = callback;
            }
            var _max = p.maxpage,
                _num = p.num = p.maxnum > _max ? _max : p.maxnum;
            p.current = 1;
            var domArr = ['<span style="display:none;" class="prev">上一页</span><span class="page active">1</span><span class="ldot" style="display:none"> … </span>'];
            for (var i = 1, tempTxt; i < _num; i++) {
                tempTxt = i + 1;
                if (i == _num - 1) {
                    var show = ' style="display:none"';
                    if (_max > _num) {
                        tempTxt = _max;
                        show = '';
                    }
                    domArr.push('<span class="rdot"' + show + '> … </span>');
                }
                domArr.push('<span class="page">' + tempTxt + '</span>');
            }
            domArr.push('<span class="next">下一页</span>');
            _pagination.innerHTML = domArr.join('');
        }
    };
    p.dom.onclick = function(e) {
        var e = e || window.event,
            self = e.target || e.srcElement; //兼容ie8
        switch (self.className) {
            case 'page':
                if (p.current != +self.innerHTML) {
                    var n = p.current = +self.innerHTML;
                    p.pageTo(n);
                }
                break;
            case 'prev':
                if (p.current > 1) {
                    var n = --p.current;
                    p.pageTo(n);
                }
                break;
            case 'next':
                if (p.current < p.maxpage) {
                    var n = ++p.current;
                    p.pageTo(n);
                }
                break;
        }
    };
    "object" == typeof exports ? module.exports = p : "function" == typeof define && (define.cmd || define.amd) ? define(function() {
        return p
    }) : window.pagination = p;
}()
