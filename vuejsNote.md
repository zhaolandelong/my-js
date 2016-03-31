##1.防止数据未加载完成就渲染  
head中加入  
>[v-cloak],[v-if],[v-show]{display: none}  
就不用担心数据加载完成之前显示各种难看的{{}}了  

##2.v-if用在最顶层无效，v-show可以  
&lt;div id="test" v-if="false"></div>无效  
&lt;div id="test" v-show="false"></div>有效  
&lt;div id="test">&lt;div v-if="false"></div></div>有效  

##3.想在组件中写入内容，用&lt;slot></slot>  
例：  
html代码：&lt;my-frame>如果不用slot，我就不会显示哦&lt;/my-frame>  

如果myFrame模板为：  
template:&lt;div>我是头&lt;/div>&lt;div>我是尾&lt;/div>  
最后渲染的是：  
>我是头  
>我是尾  

如果myFrame模板为：  
template:&lt;div>我是头&lt;/div>&lt;slot>&lt;/slot>&lt;div>我是尾&lt/div>  
最后渲染的是：  
>我是头  
>如果不用slot，我就不会显示哦  
>我是尾  

很有用哦
