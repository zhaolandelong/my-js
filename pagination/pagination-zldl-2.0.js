//纯原生无依赖，支持多个pagination
! function() {
    "use strict";
    var Pagination = function(id) {
        this.id = id;
        this.num = 1; //当前item数
        this.maxnum = 6; //最大item数
        this.maxpage = 1; //最大页码
        this.current = 1; //当前页码
        this.dom = document.getElementById(id); //父dom
        this.callback = function() {};
    };
    Pagination.prototype = {
        pageTo: function(n) { //翻页执行的方法
            console.log('turn to page', n);
            this.callback(n);
            this.rend(n);
        },
        rend: function(n) { //渲染dom
            var _num = this.num,
                _max = this.maxpage,
                mid = Math.round(this.maxnum / 2),
                start = 2,
                dom = this.dom, //父dom
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
        init: function(maxpage, callback) { //初始化
            var _pagination = this.dom;
            if (!_pagination) {
                console.warn('如要添加分页，请在html中加入id为 ' + this.id + ' 的div');
                return;
            }
            console.log('pagination baseon ' + this.id + ' initialization success!');
            //为了兼容ie8，别嫌奇怪
            var domTmp = document.createElement('div');
            domTmp.innerHTML = 'x<style>.pagination-zldl{-moz-user-select: none;-o-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;margin: 0 auto;padding: 5px;font-size: 14px;text-align: center;color: #666;}.pagination-zldl>.page,.pagination-zldl>.prev,.pagination-zldl>.next{display: inline-block;box-sizing: border-box;padding: 7px 13px;border: 1px solid #d1d1d1;background-color: #ffffff;cursor: pointer;margin: 0 3px}.pagination-zldl>.active{color: #fff;border: 1px solid #55626d;background: #55626d;}</style>'
            document.getElementsByTagName('head')[0].appendChild(domTmp.lastChild);
            _pagination.className = 'pagination-zldl';
            if (typeof(maxpage) == 'number') {
                if (maxpage <= 1) {
                    _pagination.style.display = 'none';
                    return;
                } else {
                    _pagination.style.display = 'block';
                    this.maxpage = maxpage;
                }
            } else {
                console.warn('the 1st argument in init must be a number!');
                return;
            }
            if (callback && typeof(callback) == 'function') {
                this.callback = callback;
            } else {
                console.warn('the 2nd argument in init must be a function!');
                return;
            }
            var _num = this.num = this.maxnum > maxpage ? maxpage : this.maxnum;
            var domArr = ['<span style="display:none;" class="prev">上一页</span><span class="page active">1</span><span class="ldot" style="display:none"> … </span>'];
            for (var i = 1, tempTxt; i < _num; i++) {
                tempTxt = i + 1;
                if (i == _num - 1) {
                    var show = ' style="display:none"';
                    if (maxpage > _num) {
                        tempTxt = maxpage;
                        show = '';
                    }
                    domArr.push('<span class="rdot"' + show + '> … </span>');
                }
                domArr.push('<span class="page">' + tempTxt + '</span>');
            }
            domArr.push('<span class="next">下一页</span>');
            _pagination.innerHTML = domArr.join('');
            var self = this;
            this.dom.onclick = function(e) {
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
    "object" == typeof exports ? module.exports = Pagination : "function" == typeof define && (define.cmd || define.amd) ? define(function() {
        return Pagination
    }) : window.Pagination = Pagination;
}()
