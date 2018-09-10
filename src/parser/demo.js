const parse = require('./index').parse;

const test = 'INT(1.23+3.36%-5.21*8%/2.5%)';
// const test = '1.23';
// const test = 'IF("应纳税所得额"<=1500,3%,IF("应纳税所得额"<=4500,10%,IF("应纳税所得额"<=9000,0.2,0.35)))';


console.log(parse(test))
