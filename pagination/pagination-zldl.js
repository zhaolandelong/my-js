//依赖jQuery
! function($) {
    $('head').append('<style>#pagination{margin: 0 auto; padding: 5px; font-size: 14px; text-align: center;color: #666;} #pagination>.page,#pagination>.prev,#pagination>.next{display: inline-block; box-sizing: border-box; padding: 7px 13px; border: 1px solid #d1d1d1; background-color: #ffffff; cursor: pointer; margin: 0 3px} #pagination>.active{color: #fff; border: 1px solid #55626d; background: #55626d;}</style>');
    var p = {
        num: 1, //当前item数
        maxnum: 6, //最大item数
        maxpage: 1, //最大页码
        current: 1, //当前页码
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
                $p = $('#pagination'),
                $pages = $p.children('.page');
            n == 1 ? $p.children('.prev').hide() : $p.children('.prev').show();
            n == _max ? $p.children('.next').hide() : $p.children('.next').show();
            for (var i = 0, l = _num, $self, txt; i < l; i++) {
                $self = $pages.eq(i);
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
                $self.text(txt);
                txt == n ? ($self.hasClass('active') || $self.addClass('active')) : ($self.hasClass('active') && $self.removeClass('active'));
            }
            if (_max > _num) { //省略号
                $pages.eq(1).text() == 2 ? $p.children('.ldot').hide() : $p.children('.ldot').show();
                $pages.eq(_num - 2).text() == _max - 1 ? $p.children('.rdot').hide() : $p.children('.rdot').show();
            }
        },
        init: function(maxpage, callback) {
            console.log('pagination initialization success!');
            var $pagination = $('#pagination');
            if (typeof(maxpage) == 'number') {
                if (maxpage <= 1) {
                    $pagination.hide();
                    console.log('less than 1');
                    return;
                } else {
                    $pagination.show();
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
            if ($pagination.length == 0) {
                console.log('如要添加分页，请在html中加入id为pagination的div');
                return;
            }
            var domArr = ['<span style="display:none;" class="prev">上一页</span><span class="page active">1</span><span class="ldot" style="display:none"> … </span>'];
            for (var i = 1, tempTxt; i < _num; i++) {
                tempTxt = i + 1;
                if (i == _num - 1) {
                    var show = ' style="display:none';
                    if (_max > _num) {
                        tempTxt = _max;
                        show = '';
                    }
                    domArr.push('<span class="rdot"' + show + '> … </span>');
                }
                domArr.push('<span class="page">' + tempTxt + '</span>');
            }
            domArr.push('<span class="next">下一页</span>');
            $pagination.html(domArr);
        }
    };
    $('#pagination').on('click', '.page', function() {
        if (p.current != +$(this).text()) {
            var n = p.current = +$(this).text();
            p.pageTo(n);
        }
    }).on('click', '.prev', function() {
        if (p.current > 1) {
            var n = --p.current;
            p.pageTo(n);
        }
    }).on('click', '.next', function() {
        if (p.current < p.maxpage) {
            var n = ++p.current;
            p.pageTo(n);
        }
    });
    "object" == typeof exports ? module.exports = p : "function" == typeof define && (define.cmd || define.amd) ? define(function() {
        return p
    }) : this.pagination = p;
}(jQuery)
