const NP = require('number-precision');
const rules = [ // 正则匹配字符，返回index
  /^(?:\s+)/, // 空白符
  /^(?:"(\\["]|[^"])*")/, // "adwe123" \"adwe123\"
  /^(?:'(\\[']|[^'])*')/, // 'adwe123' \'adwe123\'
  /^(?:[A-Za-z]{1,}[A-Za-z_0-9\.]+(?=[(]))/, // ABS  F.INV.RT
  /^(?:#[A-Z0-9\/]+(!|\?)?)/,
  /^(?:\$[A-Za-z]+\$[0-9]+)/,
  /^(?:\$[A-Za-z]+[0-9]+)/,
  /^(?:[A-Za-z]+\$[0-9]+)/,
  /^(?:[A-Za-z]+[0-9]+)/,
  /^(?:[A-Za-z\.]+(?=[(]))/,
  /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/,
  /^(?:[A-Za-z_]+)/,
  /^(?:[0-9]+)/, // 123
  /^(?:\[(.*)?\])/,
  /^(?:&)/,
  /^(?: )/,
  /^(?:[.])/, // .
  /^(?::)/,
  /^(?:;)/,
  /^(?:,)/, // ,
  /^(?:\*)/, // *
  /^(?:\/)/, // /
  /^(?:-)/, // -
  /^(?:\+)/, // +
  /^(?:\^)/, // ^
  /^(?:\()/, // (
  /^(?:\))/, // )
  /^(?:>)/, // >
  /^(?:<)/, // <
  /^(?:NOT\b)/,
  /^(?:")/,
  /^(?:')/,
  /^(?:!)/, // !
  /^(?:=)/, // =
  /^(?:%)/, // %
  /^(?:[#])/,
  /^(?:$)/,
];

const SYMBOL = [16, 27, 28, 33]; // . > < =

exports.parse = function (input) {
  let _input = input.replace(/\s+/g, '');
  const tStack = []; // total stack
  const willAction = []; // 需要操作符之后的数据进行运算的，操作符入栈
  let match;
  let matchVal;
  let i;
  let opt;
  const l = rules.length;
  while (_input.length > 0) {
    for (i = 0; i < l; i++) {
      match = _input.match(rules[i]);
      if (match) {
        matchVal = match[0];
        _input = _input.slice(matchVal.length);
        // 压栈
        switch (i) {
          case 34: // %百分号
            matchVal = NP.divide(tStack.pop(), 100);
            break;
          case 12: // 数字
            matchVal = +matchVal;
            break;
          default:
        }
        tStack.push(matchVal);
        if (willAction.length) {
          opt = willAction.pop();
          switch (opt) {
            case 16: // .
              tStack.splice(-3, 3, +tStack.slice(-3).join(''));
              break;
            default:
          }
        }
        if (SYMBOL.includes(i)) { // 计算符号压符号栈
          willAction.push(i);
        }
        break;
      }
    }
  }
  return tStack;
}
