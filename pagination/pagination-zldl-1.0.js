!function(){"use strict";var e=document.createElement("div");e.innerHTML="x<style>#pagination{-moz-user-select: none;-o-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;margin: 0 auto; padding: 5px; font-size: 14px; text-align: center;color: #666;} #pagination>.page,#pagination>.prev,#pagination>.next{display: inline-block; box-sizing: border-box; padding: 7px 13px; border: 1px solid #d1d1d1; background-color: #ffffff; cursor: pointer; margin: 0 3px} #pagination>.active{color: #fff; border: 1px solid #55626d; background: #55626d;}</style>",document.getElementsByTagName("head")[0].appendChild(e.lastChild);var n={num:1,maxnum:6,maxpage:1,current:1,dom:document.getElementById("pagination"),callback:function(){},pageTo:function(e){console.log("turn to page",e),n.callback(e),n.rend(e)},rend:function(e){var a=n.num,o=n.maxpage,t=Math.round(n.maxnum/2),i=n.dom,r=i.querySelector(".prev"),s=i.querySelector(".next"),l=i.querySelector(".ldot"),c=i.querySelector(".rdot"),p=i.querySelectorAll(".page");r.style.display=1==e?"none":"inline-block",s.style.display=e==o?"none":"inline-block";for(var d,u,m,g=0,f=a;g<f;g++)d=p[g],m=0==g?g+1:g==f-1?o:e<=t?g+1:e>=o-t+1?o-a+g+1:e-t+g+1,d.innerHTML=m,u=d.className,u.indexOf("active")!=-1?m!=e&&(d.className=u.replace(" active","")):m==e&&(d.className=u+" active");o>a&&(l.style.display=2==p[1].innerHTML?"none":"",c.style.display=p[a-2].innerHTML==o-1?"none":"")},init:function(e,a){console.log("pagination initialization success!");var o=n.dom;if(!o)return void console.log("如要添加分页，请在html中加入id为pagination的div");if("number"==typeof e){if(e<=1)return o.style.display="none",void console.log("less than 1");o.style.display="block",n.maxpage=e,console.log("more than 1")}else console.log("maxpage must be number!");a&&"function"==typeof a&&(n.callback=a);var t=n.maxpage,i=n.num=n.maxnum>t?t:n.maxnum;n.current=1;for(var r,s=['<span style="display:none;" class="prev">上一页</span><span class="page active">1</span><span class="ldot" style="display:none"> … </span>'],l=1;l<i;l++){if(r=l+1,l==i-1){var c=' style="display:none"';t>i&&(r=t,c=""),s.push('<span class="rdot"'+c+"> … </span>")}s.push('<span class="page">'+r+"</span>")}s.push('<span class="next">下一页</span>'),o.innerHTML=s.join("")}};n.dom.onclick=function(e){var e=e||window.event,a=e.target||e.srcElement;switch(a.className){case"page":if(n.current!=+a.innerHTML){var o=n.current=+a.innerHTML;n.pageTo(o)}break;case"prev":if(n.current>1){var o=--n.current;n.pageTo(o)}break;case"next":if(n.current<n.maxpage){var o=++n.current;n.pageTo(o)}}},"object"==typeof exports?module.exports=n:"function"==typeof define&&(define.cmd||define.amd)?define(function(){return n}):window.pagination=n}();