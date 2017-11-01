/**
 * [isAndroid 是否是安卓 true-是 false-不是]
 * @type {Boolean}
 */
export const isAndroid = navigator.userAgent.indexOf('Android') != -1 || navigator.userAgent.indexOf('Linux') != -1;

/**
 * [urlParam 获取url中的参数]
 * @param  {[type]} param [要获取的参数key]
 * @return {[type]}       [description]
 */
export function urlParam(param) {
    var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)'),
        r = window.location.search.substr(1).match(reg);
    return r != null ? decodeURIComponent(r[2]) : null;
}

/**
 * [deepCopy 深拷贝]
 * @param {*} value 
 */
export function deepCopy(value) {
    var _value = null;
    if (value) {
        switch (Object.prototype.toString.call(value)) {
            case '[object Object]':
                _value = {};
                for (var k in value) {
                    _value[k] = deepCopy(value[k]);
                }
                break;
            case '[object Array]':
                _value = [];
                for (var i = 0; i < value.length; i++) {
                    _value[i] = deepCopy(value[i]);
                }
                break;
            default:
                _value = value;
        }
    } else {
        _value = value;
    }
    return _value;
}

/**
 * [ajaxBase 基础ajax封装]
 * @param {*} opt 
 * 
 * eg:
 * function ajax(url, data, sucFun, type, contentType, comFun) => {
        let _type = type || 'GET',
            _ct = contentType || 0,
            _comFun = comFun || function () { };
        ajaxBase({
            url: url + '?_timezhaolandelong=' + Date.now(),
            type: _type,
            contentType: _ct,
            data: data,
            before: function (xhr) {
                canShowLoading = true;
                let a = setTimeout(function () {
                    if (canShowLoading) {
                        showLoading();
                    }
                    clearTimeout(a);
                    a = null;
                }, 500);
            },
            complete: function (res) {
                _comFun(res);
                canShowLoading = false;
                hideLoading();
            },
            success: function (res) {
                if (res.code === 1) {
                    if (window.diy) {
                        res = window.diy(res, url);
                    }
                    sucFun(res);
                } else if (res.code === 302) {
                    location.replace(res.data + location.href);
                } else {
                    let _msg = res.retMsg || res.msg;
                    toast(_msg);
                }
            },
            error: function (err) {
                toast(JSON.stringify(err));
            }
        });
    }
 * 
 */
export function ajaxBase(opt) {
    //default _o
    var _o = {
        url: '/',
        async: true, //是否异步
        contentType: 0, //head编码方式，0 - urlencoded; 1 - json;2 - form-data
        jsonForce: true, //是否强制要求返回格式为json
        processData: true, //是否序列化参数
        type: 'GET', //method
        data: null,
        before: function (xhr) { },
        success: function (res, xhr) { },
        error: function (res, xhr) { },
        complete: function (res, xhr) { }
    };
    //extend opt
    for (var pname in opt) {
        if (pname === 'type') {
            _o[pname] = opt[pname].toUpperCase();
        } else {
            _o[pname] = opt[pname];
        }
    }
    //1.创建XMLHttpRequest实例
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //是否需要将返回结果转换为json
            var resTxt = _o.jsonForce ? JSON.parse(xhr.responseText || null) : xhr.responseText;
            //do always callback
            _o.complete(resTxt, xhr);
            var stat = xhr.status;
            if (stat < 200 || stat >= 300 && stat !== 304) { //do error callback
                _o.error(resTxt, xhr);
            } else { //do success callback
                _o.success(resTxt, xhr);
            }
        }
    };
    //如果contentType不为0，强制不拼接
    _o.contentType !== 0 && (_o.processData = false);
    //拼接data
    var _data = _o.data || null;
    if (_data && _o.processData && typeof _data === "object") {
        var _arrData = [];
        for (var key in _data) {
            _arrData.push(encodeURIComponent(key) + "=" + encodeURIComponent(_data[key]));
        }
        _data = _arrData.join('&').replace(/%20/g, '+');
        if (_o.type === 'GET') { //get 拼接url
            _o.url += (/\?/.test(_o.url) ? '&' : '?') + _data;
            _data = null;
        }
    }
    xhr.open(_o.type, _o.url, _o.async);
    _o.before(xhr);
    if (_o.type === 'POST') { //post 改头
        if (_o.contentType === 0) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        } else if (_o.contentType === 1) {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            _data = JSON.stringify(_data);
        }
    }
    xhr.send(_data);
}

/**
 * [getCookie 获取cookie]
 * @param  {[type]} name [要获取的cookie key]
 * @return {[type]}      [description]
 */
export function getCookie(name) {
    var arr = [],
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    return (arr = document.cookie.match(reg)) ? arr[2] : null;
}

/**
 * 倒计时用 t单位s
 */
export function countDown(t) {
    var h = Math.floor(t / 3600),
        m = Math.floor(t / 60) - h * 60,
        s = t - h * 3600 - m * 60;
    return h + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
}

/**
 * [add 两数相加，防止出现0.1+0.7==>0.79999999999]
 * @param {[type]} a [description]
 * @param {[type]} b [description]
 */
export function add(a, b) {
    var r1, r2, m;
    try {
        r1 = a.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = b.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (a * m + b * m) / m;
}

/**
 * 阿拉伯数字转中文数字
 * 
 * 中文数字的特点：
 * 1、每个计数数字都跟着一个权位，权位有：十、百、千、万、亿。
 * 2、以“万”为小节，对应一个节权位，万以下没有节权位。
 * 3、每个小节内部以“十百千”为权位独立计数。
 * 4、“十百千”不能连续出现，而“万”和“亿”作为节权位时可以和其他权位连用，如：“二十亿”。
 * 
 * 中文数字对“零”的使用要满足以下三条规则：
 * 1、以10000为小节，小节的结尾即使是0，也不使用零。
 * 2、小节内两个非0数字之间要使用“零”。
 * 3、当小节的“千”位是0时（即：1~999），只要不是首小节，都要补“零”。
 * 
 * 算法设计的一些说明：
 * 1、对“零”的第三个规则，把检测放在循环的最前面并默认为false，可以自然的丢弃最高小节的加零判断。
 * 2、单个数字转换用数组实现，["零","一","二","三","四","五","六","七","八","九"];
 * 3、节权位同样用数组实现，["","万","亿","万亿","亿亿"];
 * 4、节内权位同样用数组实现，["","十","百","千"];
 */
export const numChar = {
    num: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"], //小于10000
    unit: ["", "十", "百", "千"], //小于10000
    section: ["", "万", "亿", "万亿", "亿亿"] //大于10000
}

export function numToChar(section) { //节内转换算法，小于10000
    var strIns = '',
        chnStr = '';
    var unitPos = 0;
    var zero = true;
    if (section > 9 && section < 20) {
        return '十' + (section === 10 ? '' : numChar.num[section % 10]);
    } else {
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = numChar.num[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = numChar.num[v];
                strIns += numChar.unit[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }
}

export function largeToChar(num) { //转换算法主函数，所有数，依赖numToChar
    var unitPos = 0;
    var strIns = '',
        chnStr = '';
    var needZero = false;

    if (num === 0) {
        return numChar.num[0];
    }

    while (num > 0) {
        var section = num % 10000;
        if (needZero) {
            chnStr = numChar.num[0] + chnStr;
        }
        strIns = numToChar(section);
        strIns += (section !== 0) ? numChar.section[unitPos] : numChar.section[0];
        chnStr = strIns + chnStr;
        needZero = (section < 1000) && (section > 0);
        num = Math.floor(num / 10000);
        unitPos++;
    }

    return chnStr;
}

/**
 * [isEmpty 判断空，包括对象、数组]
 * @param {*} val 
 */
export function isEmpty(val) {
    var result = false;
    switch (Object.prototype.toString.call(val)) {
        case '[object Object]':
            result = JSON.stringify(val) === '{}';
            break;
        case '[object Array]':
            result = val.length === 0;
            break;
        default:
            result = !val;

    }
    return result;
}