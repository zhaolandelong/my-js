/**
 * 2017.07.12 by zhaolandelong
 * zhaolandelong@163.com
 * https://github.com/zhaolandelong
 * friendly to ie8+ and totaly native
 */
! function() {
    "use strict";
    var PLUGINNAME = "pagiZldl";
    //样式
    var styleObj = {
        wrap: {
            'user-select': 'none',
            'margin': '0 auto',
            'text-align': 'right',
            'padding': '20px',
            'font-size': '12px',
            'color': '#4f4f4f',
            'background': '#fff',
            'line-height': 1
        },
        tap: {
            'box-sizing': 'border-box',
            'display': 'inline-block',
            'cursor': 'pointer',
            'padding': '6px 8px 5px',
            'border': '1px solid #ccc',
            'background': '#fff',
            'border-radius': '2px',
            'margin': '0 2px'
        },
        disabled: {
            'background': '#eee'
        },
        hide: {
            'display': 'none'
        }
    };
    var arrStyle = [],
        tmpStyle;
    for (var k in styleObj) {
        tmpStyle = styleObj[k];
        arrStyle.push('.' + PLUGINNAME + '-' + k + '{');
        for (var sk in tmpStyle) {
            arrStyle.push(sk + ':' + tmpStyle[sk] + ';');
        }
        arrStyle.push('}');
    }

    var Pagination = function(options) {
        var _options = typeof options === 'object' ? options : {};
        this.options = {
            id: "pagination", //主id
            item: 7, //最大item数
            prev: "◀",
            next: "▶",
            styleId: PLUGINNAME //class的前缀，同时是style标签的id，防止重复添加
        };
        for (var key in this.options) {
            if (_options[key]) {
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
            var me = this,
                _num = me.num,
                _max = me.maxpage,
                _styleId = me.options.styleId,
                _classDisabled = _styleId + '-disabled',
                _classHide = _styleId + '-hide',
                mid = me.mid,
                doms = me.doms,
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
                txt == n ? addClass(tmp, _classDisabled) : rmClass(tmp, _classDisabled);
            }
            n == 1 ? addClass(doms.dPre, _classDisabled) : rmClass(doms.dPre, _classDisabled); //是否第一页
            n == _max ? addClass(doms.dNex, _classDisabled) : rmClass(doms.dNex, _classDisabled); //是否最后一页
            if (_max > _num) { //省略号
                dPage[1].innerHTML == 2 ? addClass(doms.dLdot, _classHide) : rmClass(doms.dLdot, _classHide);
                dPage[_num - 2].innerHTML == _max - 1 ? addClass(doms.dRdot, _classHide) : rmClass(doms.dRdot, _classHide);
            }
        },
        init: function(maxpage, callback) { //初始化
            var me = this,
                doms = me.doms,
                _wrap = doms.wrap,
                _o = me.options,
                _styleId = _o.styleId,
                _classWrap = _styleId + '-wrap',
                _classTap = _styleId + '-tap',
                _classDisabled = _styleId + '-disabled',
                _classHide = _styleId + '-hide';
            if (!_wrap) {
                console.warn('如要添加分页，请在html中加入id为 ' + _o.id + ' 的div');
                return;
            }
            console.log('pagination baseon ' + _o.id + ' initialization success!');
            if (!document.getElementById(_styleId)) { //防止重复添加
                var domTmp = document.createElement('div'),
                    re = new RegExp(PLUGINNAME, 'g');
                //为了兼容ie8，别嫌奇怪
                domTmp.innerHTML = 'x<style id="' + _styleId + '">' + arrStyle.join('').replace(re, _styleId) + '</style>';
                document.getElementsByTagName('head')[0].appendChild(domTmp.lastChild);
            }
            _wrap.className = _classWrap;
            if (typeof maxpage === 'number') {
                if (maxpage <= 1) {
                    _wrap.style.display = 'none';
                    return;
                } else {
                    _wrap.style.display = 'block';
                    me.maxpage = maxpage;
                }
            } else {
                console.log('the 1st argument in init must be a number!');
                return;
            }
            if (callback && typeof callback === 'function') {
                me.callback = callback;
            } else {
                console.log('the 2nd argument in init must be a function!');
                return;
            }
            var _num = me.num = _o.item > maxpage ? maxpage : _o.item;
            var domArr = ['<i class="prev ' + _classTap + ' ' + _classDisabled + '">' + _o.prev + '</i><i class="page ' + _classTap + ' ' + _classDisabled + '">1</i><i class="ldot ' + _classHide + '"> … </i>'];
            for (var i = 1, tempTxt; i < _num; i++) {
                tempTxt = i + 1;
                if (i == _num - 1) {
                    var show = ' ' + _classHide;
                    if (maxpage > _num) {
                        tempTxt = maxpage;
                        show = '';
                    }
                    domArr.push('<i class="rdot' + show + '"> … </i>');
                }
                domArr.push('<i class="page ' + _classTap + '">' + tempTxt + '</i>');
            }
            domArr.push('<i class="next ' + _classTap + '">' + _o.next + '</i>');
            _wrap.innerHTML = domArr.join('');
            doms.dPre = _wrap.querySelector('.prev'); //上一页
            doms.dNex = _wrap.querySelector('.next'); //下一页
            doms.dLdot = _wrap.querySelector('.ldot'); //左省略号
            doms.dRdot = _wrap.querySelector('.rdot'); //右省略号
            doms.dPage = _wrap.querySelectorAll('.page'); //页码

            _wrap.onclick = function(e) {
                var e = e || window.event,
                    target = e.target || e.srcElement; //兼容ie8
                if (!hasClass(target, _classDisabled)) {
                    if (hasClass(target, 'page')) {
                        if (me.current != +target.innerHTML) {
                            me.pageTo(me.current = +target.innerHTML);
                        }
                    } else if (hasClass(target, 'next')) {
                        if (me.current < me.maxpage) {
                            me.pageTo(++me.current);
                        }
                    } else if (hasClass(target, 'prev')) {
                        if (me.current > 1) {
                            me.pageTo(--me.current);
                        }
                    }
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
