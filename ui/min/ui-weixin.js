!function(){"use strict";var t="uiZldl",i='.uiZldl{display:none}.uiZldl-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,.6)}.uiZldl-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.uiZldl-tit{font-weight:400;font-size:18px;padding:1.3em 1.6em .5em}.uiZldl-x{display:none}.uiZldl-txt{padding:0 1.6em .8em;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;word-break:break-all;color:#999}.uiZldl-btn{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;color:#353535}.uiZldl-btnwrap{position:relative;line-height:48px;font-size:18px;display:-webkit-box;display:-webkit-flex;display:flex}.uiZldl-btn.act::after,.uiZldl-btnwrap::after{content:" ";position:absolute;left:0;top:0;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0}.uiZldl-btnwrap::after{right:0;height:1px;border-top:1px solid #d5d5d6;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.uiZldl-btn.act{color:#3cc51f}.uiZldl-btn.act::after{width:1px;bottom:0;border-left:1px solid #d5d5d6;-webkit-transform:scaleX(.5);transform:scaleX(.5)}';if(!document.getElementById(t)){var e=document.createElement("div"),n=new RegExp(t,"g");e.innerHTML='x<style id="'+t+'">'+i.replace(n,t)+"</style>",document.getElementsByTagName("head")[0].appendChild(e.lastChild);var l=document.createElement("div");l.id=l.className=t,l.innerHTML='<div class="uiZldl-mask"></div><div class="uiZldl-dialog"><div class="uiZldl-tit">弹窗标题</div><div class="uiZldl-txt">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div><div class="uiZldl-btnwrap"><a href="javascript:;"class="uiZldl-btn">辅助操作</a><a href="javascript:;"class="uiZldl-btn act">主操作</a></div><a href="javascript:;"class="uiZldl-x">×</a></div>',document.body.appendChild(l)}var d=l.children[1],o=d.children[2],a={doms:{wrap:l,mask:l.children[0],dialog:d,tit:d.children[0],txt:d.children[1],btnwrap:o,x:d.children[3],btn0:o.children[0],btn1:o.children[1]},show:function(){a.doms.wrap.style.display="block"},hide:function(){a.doms.wrap.style.display="none","none"===a.doms.btn0.style.display&&(a.doms.btn0.style.display="")},alert:function(t,i,e,n){var l="function"==typeof i?i:function(){};a.doms.txt.innerHTML=t||"",a.doms.tit.innerHTML=e||"提示",a.doms.btn1.innerHTML=n||"确定",a.doms.btn0.style.display="none",a.doms.btn1.onclick=function(t){t.preventDefault(),l(),a.hide()},a.show()},confirm:function(t,i,e,n,l){var d="function"==typeof i?i:function(){},o="function"==typeof e?e:function(){},r=l||[];a.doms.txt.innerHTML=t||"",a.doms.tit.innerHTML=n||"提示",a.doms.btn0.innerHTML=r[0]||"确定",a.doms.btn1.innerHTML=r[1]||"取消",a.doms.btn0.onclick=function(t){t.preventDefault(),d(),a.hide()},a.doms.btn1.onclick=function(t){t.preventDefault(),o(),a.hide()},a.show()}};"object"==typeof exports?module.exports=a:"function"==typeof define&&(define.cmd||define.amd)?define(function(){return a}):window.ui=a}();