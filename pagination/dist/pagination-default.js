!function(){"use strict";var e=function(e,n){return 1===e.nodeType&&(" "+e.className+" ").replace(/\s+/g," ").indexOf(" "+n+" ")!==-1},n=function(n,a){e(n,a)||(n.className=n.className+" "+a)},a=function(n,a){e(n,a)&&(n.className=(" "+n.className).replace(" "+a,"").replace(/(^\s*)/g,""))},i=function(e){this.id=e,this.num=1,this.maxnum=6,this.maxpage=1,this.current=1,this.callback=function(){},this.doms={wrap:document.getElementById(e),dPre:null,dNex:null,dLdot:null,dRdot:null,dPage:null}};i.prototype={pageTo:function(e){console.log("turn to page",e),this.callback(e),this.rend(e)},rend:function(e){var i=this.num,t=this.maxpage,d=Math.round(this.maxnum/2),s=this.doms,l=s.dPre,o=s.dNex,r=s.dLdot,c=s.dRdot,p=s.dPage;1==e?n(l,"disabled"):a(l,"disabled"),e==t?n(o,"disabled"):a(o,"disabled");for(var u,g,m=0,b=i;m<b;m++)u=p[m],g=0==m?m+1:m==b-1?t:e<=d?m+1:e>=t-d+1?t-i+m+1:e-d+m+1,(u.innerHTML=g)==e?n(u,"disabled"):a(u,"disabled");t>i&&(2==p[1].innerHTML?n(r,"disabled"):a(r,"disabled"),p[i-2].innerHTML==t-1?n(c,"disabled"):a(c,"disabled"))},init:function(e,n){var a=this.doms,i=a.wrap,t=this;if(!i)return void console.warn("如要添加分页，请在html中加入id为 "+t.id+" 的div");console.log("pagination baseon "+t.id+" initialization success!");var d=document.createElement("div");if(d.innerHTML="x<style>.pagination-zldl{-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;margin:0 auto;padding:5px;font-size:14px;text-align:center;color:#666;line-height:18px}.pagination-zldl>.next,.pagination-zldl>.page,.pagination-zldl>.prev{display:inline-block;box-sizing:border-box;padding:7px 13px;border:1px solid #d1d1d1;background-color:#fff;cursor:pointer;margin:0 3px}.pagination-zldl>.page.disabled{color:#fff;border:1px solid #55626d;background:#55626d}.pagination-zldl>.ldot.disabled,.pagination-zldl>.next.disabled,.pagination-zldl>.prev.disabled,.pagination-zldl>.rdot.disabled{display:none}</style>",document.getElementsByTagName("head")[0].appendChild(d.lastChild),i.className="pagination-zldl","number"!=typeof e)return void console.warn("the 1st argument in init must be a number!");if(e<=1)return void(i.style.display="none");if(i.style.display="block",t.maxpage=e,!n||"function"!=typeof n)return void console.warn("the 2nd argument in init must be a function!");t.callback=n;for(var s,l=t.num=t.maxnum>e?e:t.maxnum,o=['<span class="prev disabled">上一页</span><span class="page disabled">1</span><span class="ldot disabled"> … </span>'],r=1;r<l;r++){if(s=r+1,r==l-1){var c=" disabled";e>l&&(s=e,c=""),o.push('<span class="rdot'+c+'"> … </span>')}o.push('<span class="page">'+s+"</span>")}o.push('<span class="next">下一页</span>'),i.innerHTML=o.join(""),a.dPre=i.querySelector(".prev"),a.dNex=i.querySelector(".next"),a.dLdot=i.querySelector(".ldot"),a.dRdot=i.querySelector(".rdot"),a.dPage=i.querySelectorAll(".page"),i.onclick=function(e){var e=e||window.event,n=e.target||e.srcElement;switch(n.className){case"page":t.current!=+n.innerHTML&&t.pageTo(t.current=+n.innerHTML);break;case"prev":t.current>1&&t.pageTo(--t.current);break;case"next":t.current<t.maxpage&&t.pageTo(++t.current)}}}},"object"==typeof exports?module.exports=i:"function"==typeof define&&(define.cmd||define.amd)?define(function(){return i}):window.Pagination=i}();