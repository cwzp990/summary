# summary
这里是工作中遇到的一些问题，以及相应的解决方法！

## 1. vue项目初次加载动画怎么做?

一般做法，是在入口的html文件里直接添加你要的加载提示，让它在页面刚开始加载的时候默认显示，而隐藏主页面的root标签。再在vue项目的入口vue里的created或mounted里将加载提示的标签删除或隐藏，再将主页面root标签显示。

入口HTML文件：

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo</title>
    <link rel="icon" href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon">
    <style media="screen" type="text/css">
      #appLoading { width: 100%; height: 100%; }
      #appLoading img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        -webkit-transform: translateY(-50%)  translateX(-50%);
        transform: translateY(-50%)  translateX(-50%);
      }
    </style>
  </head>
  <body>
    <div id="appLoading">
      <img src="/static/img/loading.gif" alt="loading" />
    </div>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
入口vue文件：

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created() {
      try {
        document.body.removeChild(document.getElementById('appLoading'))
        setTimeout(function() {
          document.getElementById('app').style.display = 'block';
        }, 500)
      } catch (e) {

      }
    }
  }
</script>
```

原文地址：https://segmentfault.com/q/1010000010915881?sort=created

## 2. 移动端兼容问题

移动端小键盘弹起会吧背景图弹上去 待解决 :punch:

## 3. 小程序录音相关
需求：在小程序里把小程序录音的mp3文件给转成pcm，pcm发送给后台接口，转换成翻译机可以识别的音频格式

原文地址：https://www.cnblogs.com/blqw/p/3782420.html

ps.
需求: 用node.js把小程序的录音文件转换成wav文件
注：前后端都需要和微信接口打通，才能从微信服务器拉倒音频文件，拿到文件后，再做转码
node.js视频转码
原文地址：
微信小程序录音之获取保存读取：https://blog.csdn.net/txx_c/article/details/78970044
微信小程序录音文件.silk上传服务器转mp3格式：http://www.yiyongtong.com/archives/view-2305-1.html
node.js实现视频转码：https://blog.csdn.net/fareise/article/details/53188785

pps. 小程序相关：https://juejin.im/post/5b0ccd4e51882515861d2347

## 4. iframe页面通信

父页面

```js

<html>
<head>
    <script type="text/javascript">
        function say(){
            alert("parent.html");
        }
        function callChild(){
            myFrame.window.say();
            myFrame.window.document.getElementById("button").value="调用结束";
        }
    </script>
</head>
<body>
    <input id="button" type="button" value="调用child.html中的函数say()" onclick="callChild()"/>
    <iframe name="myFrame" src="child.html"></iframe>
</body>
</html>

```

子页面

```js

<html>
<head>
    <script type="text/javascript">
        function say(){
            alert("child.html");
        }
        function callParent(){
            parent.say();
            parent.window.document.getElementById("button").value="调用结束";
        }
    </script>
</head>
<body>
    <input id="button" type="button" value="调用parent.html中的say()函数" onclick="callParent()"/>
</body>
</html>

```

跨域父子页面通信方法
如果iframe所链接的是外部页面，因为安全机制就不能使用同域名下的通信方式了。
父页面向子页面传递数据

实现的技巧是利用location对象的hash值，通过它传递通信数据。在父页面设置iframe的src后面多加个data字符串，然后在子页面中通过某种方式能即时的获取到这儿的data就可以了，例如：

1. 在子页面中通过setInterval方法设置定时器，监听location.href的变化即可获得上面的data信息

2. 然后子页面根据这个data信息进行相应的逻辑处理
子页面向父页面传递数据

实现技巧就是利用一个代理iframe，它嵌入到子页面中，并且和父页面必须保持是同域，然后通过它充分利用上面第一种通信方式的实现原理就把子页面的数据传递给代理iframe，然后由于代理的iframe和主页面是同域的，所以主页面就可以利用同域的方式获取到这些数据。使用 window.top或者window.parent.parent获取浏览器最顶层window对象的引用。

## 5. 前端mock数据

json-server：https://github.com/typicode/json-server
![mock-pic1](https://github.com/cwzp990/summary/blob/master/images/mock1.jpg)
![mock-pic2](https://github.com/cwzp990/summary/blob/master/images/mock2.png)

## 6. 单页面应用加载性能优化

原文地址：https://mp.weixin.qq.com/s/KxJttCVuCoIrm9RAjRBrdg?appinstall=0

## 7. echarts相关

echarts是百度为数不多的良心产品~基本上填写一些配置项，图表就出来了

echarts有好几个版本，开发模式下可以选择源代码版本，内容相当多，有9w多行，出错控制台会报错
线上的话，可以选择常用版本和精简版本，几百k~

1）首先需要准备好一个容器，这样才能存放图表：

var myChart = echarts.init(document.getElementById('main'))

然后是渲染图表：

myChart.setOptions(option)

配置都放在option里面~

2）我踩过的坑

### 遇到一个需求 点击饼图的某个扇区 切换相应的柱图数据

给饼图扇区添加事件：

```js

function eConsole(param) {
  console.log(param.dataIndex)  // 当前点击的索引
  clickFunc(param.dataIndex)    // 执行点击效果
}

myChart.on("click", eConsole);

```

### 在同一个容器中显示饼图和柱图切换，柱图切换饼图时留有坐标轴：

切换option设置时，将show置为false

```js

xAxis: {
    show: false
},
yAxis: {
    show: false
}

```

### 饼图图表位置

饼图图表位置是由series里的radius和center控制的，我一开始以为和柱图一样，在grid里面调了半天没反应，百度了才知道...

### echarts的响应式

echart.resize()
option.grid.containLabel // 这个参数非常棒

**Vue使用 highcharts的扩展**

最主要的是引入扩展包

```js

import Highcharts from 'highcharts/highstock'; // 必须
import HighchartsMore from 'highcharts/highcharts-more'; // 必须
import SolidGauge from 'highcharts/modules/solid-gauge.js'
HighchartsMore(Highcharts)
SolidGauge(Highcharts);
<template>
    <div>
        <div id="highCharts" style="width: 400px; height: 300px;"></div>
    </div>
</template>

<script>
    import Highcharts from 'highcharts/highstock';
    import HighchartsMore from 'highcharts/highcharts-more';
    import SolidGauge from 'highcharts/modules/solid-gauge.js'
    HighchartsMore(Highcharts)
    SolidGauge(Highcharts);

    Highcharts.setOptions({
        chart: {
            type: 'solidgauge'
        },
        title: null,
        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    });



    export default {
        mounted(){
           this.init();
        },
        data(){
            return {
                
            }    
        },
        methods:{
            init(){
                this.draw();
            },
            draw(){
                new Highcharts.chart('highCharts', {
                    yAxis: {
                        min: 0,
                        max: 200,
                        title: {
                            text: '速度'
                        }
                    },
                    credits: {
                            enabled: false
                    },
                    series: [{
                            name: '速度',
                            data: [80],
                            dataLabels: {
                                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                                    '<span style="font-size:12px;color:silver">km/h</span></div>'
                            },
                            tooltip: {
                                    valueSuffix: ' km/h'
                            }
                    }]
                });
            }
        }
    }
</script>

```

## 8. 如何编写优化的JavaScript

JavaScript是如何工作的：深入V8引擎&编写优化代码的5个技巧

对象属性的顺序：始终以相同的顺序实例化对象属性，以便可以共享隐藏的类和随后优化的代码。
动态属性： 因为在实例化之后向对象添加属性将强制执行隐藏的类更改，并降低之前隐藏类所优化的所有方法的执行速度，所以在其构造函数中分配所有对象的属性。
方法：重复执行相同方法的代码将比仅执行一次的多个不同方法（由于内联缓存）的代码运行得更快。
数组：避免稀疏数组，其中键值不是自增的数字，并没有存储所有元素的稀疏数组是哈希表。这种数组中的元素访问开销较高。另外，尽量避免预分配大数组。最好是按需增长。最后，不要删除数组中的元素，这会使键值变得稀疏。
标记值：V8 使用 32 位表示对象和数值。由于数值是 31 位的，它使用了一位来区分它是一个对象（flag = 1）还是一个称为 SMI（SMall Integer）整数（flag = 0）。那么，如果一个数值大于 31 位，V8会将该数字装箱，把它变成一个双精度数，并创建一个新的对象来存放该数字。尽可能使用 31 位有符号数字，以避免对 JS 对象的高开销的装箱操作。

关于优化

https://juejin.im/post/5b0033c9518825056508075f

## form表单中只有一个input输入框时 ##

form表单中只有一个input输入框时， W3C规定会触发提交事件，需要组织表单的提交
vue中element-ui中使用 @submit.native.prevent阻止提交

使用form表单的一些坑

生效就是触发提交
如果表单里有一个type=”submit”的按钮，回车键生效。
如果表单里只有一个type=”text”的input，不管按钮是什么type，回车键生效。
如果按钮不是用input，而是用button，并且没有加type，IE下默认为type=button，FX默认为type=submit。
其他表单元素如textarea、select不影响，radio checkbox不影响触发规则，但本身在FX下会响应回车键，在IE下不响应。
type=”image”的input，效果等同于type=”submit”，不知道为什么会设计这样一种type，不推荐使用，应该用CSS添加背景图合适些
我在一个form表单中  写了个没有type的button  当 inupt 按回车时  触发了这个button的click事件  把这个 button 声明为type=button就行了

## vue相关

因为之前做了其他项目，vue有些东西就记不清了，好记性不如烂笔头，这里把一些易错点记录下来，方便以后查阅

### 1. 和布局相关的东西

### 2. props传值问题

在项目中遇到这么一种情况，父组件向子组件传值，子组件改变了该值，并传回去...vue会报错，vue不允许子组件修改父组件的值。
这是官方文档的原话：

父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

有两种情况：

1.子组件想将其作为局部变量使用：

```js

props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}

```

2.prop值需要经过转化后使用：

```js

props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}

```

而我的这里确实需要改变父组件传过来的值，我想到了一种办法，亲证可行。

子组件中，通过click方法派发出去一个事件(this.$emit)，父组件接受这个事件，从而在父组件里改变这个值

### 3. vue-router传参

params：/router1/:id ，/router1/123，/router1/789 ,这里的id叫做params

query：/router1?id=123 ,/router1?id=456 ,这里的id叫做query

params传参，类似于post，地址栏不显示参数

例如商品列表页面前往商品详情页面，需要传一个商品id;

<router-link :to="{path: 'detail', query: {id: 1}}">前往detail页面</router-link>

c页面的路径为http://localhost:8080/#/detail?id=1，可以看到传了一个参数id=1，并且就算刷新页面id也还会存在。此时在c页面可以通过id来获取对应的详情数据，获取id的方式是this.$route.query.id

vue传参方式有：query、params+动态路由传参。说下两者的区别

```js

// 1. query通过path切换路由，params通过name切换路由

// query通过path切换路由
<router-link :to="{path: 'Detail', query: { id: 1 }}">前往Detail页面</router-link>
// params通过name切换路由
<router-link :to="{name: 'Detail', params: { id: 1 }}">前往Detail页面</router-link>

// 2.query通过this.$route.query来接收参数，params通过this.$route.params来接收参数

// query通过this.$route.query接收参数
created () {
    const id = this.$route.query.id;
}

// params通过this.$route.params来接收参数
created () {
    const id = this.$route.params.id;
}

// 3.query传参的url展现方式：/detail?id=1&user=123&identity=1&更多参数 params＋动态路由的url方式：/detail/123

// 4.params动态路由传参，一定要在路由中定义参数，然后在路由跳转的时候必须要加上参数，否则就是空白页面

{      
    path: '/detail/:id',      
    name: 'Detail',      
    component: Detail    
}

// 注意，params传参时，如果没有在路由中定义参数，也是可以传过去的，同时也能接收到，但是一旦刷新页面，这个参数就不存在了。这对于需要依赖参数进行某些操作的行为是行不通的，因为你总不可能要求用户不能刷新页面吧.例如：

// 定义的路由中，只定义一个id参数
{
    path: 'detail/:id',
    name: 'Detail',
    components: Detail
}

// template中的路由传参，
// 传了一个id参数和一个token参数
// id是在路由中已经定义的参数，而token没有定义

<router-link :to="{name: 'Detail', params: { id: 1, token: '123456' }}">前往Detail页面</router-link>

// 在详情页接收
created () {
    // 以下都可以正常获取到
    // 但是页面刷新后，id依然可以获取，而token此时就不存在了
    const id = this.$route.params.id;
    const token = this.$route.params.token;
}

```

注意 params是路由的一部分，必须要有，而query是拼接在url后面的参数，没有也没关系。
params一旦设置在路由，params就是路由的一部分，如果这个路由有params传参，但是在跳转的时候没有传参，会导致跳转失败或页面没有内容

### 4. vue里的拖拽
**mousedown、mouseup方法**
```js
            oDiv.onmousedown=function(ev){
                var disX=ev.clientX-oDiv.offsetLeft;
                var disY=ev.clientY-oDiv.offsetTop;

                document.onmousemove=function(ev){
                    var l=ev.clientX-disX;
                    var t=ev.clientY-disY;
                    oDiv.style.left=l+'px';
                    oDiv.style.top=t+'px';
                };
                document.onmouseup=function(){
                    document.onmousemove=null;
                    document.onmouseup=null;
                };
            };
```

需要拖拽的对象设置position属性

vue在观测对象，以及数组这类数据结构是，需要写成对象的形式，并加上deep:true才能进行深层观测

```js

form: {
  handler(newVal, oldVal) {
    ......
  },
  deep: true
}

```

### 5. keep-alive和 beforeDestory

当组件使用keep-alive的时候，组件的生命周期beforeDestory不再生效，应使用deactivated或者beforeRouterLeave代替
152. 数据驱动慎用清空列表(优化小细节)

场景介绍
// 列表页 每次获取新数据清空列表
this.list = [];
this.loadData()
造成的影响
如果设备比较卡 或者网络比较慢
会造成列表页空白或显示暂无数据（看你交互方式）
用户体验不好 看起来一闪一闪的
我的解决办法 -> 请求完毕后咋成功回调里直接覆盖数据
loadData().then(res=>{
    Array.isArray(res.contentList) && (this.list = res.contentList)
})

**drag方法**

@dragstart：拖拽开始事件，可绑定于被拖拽元素上；
@dragend：拖拽结束事件，可绑定于被拖拽元素上；
@dragover：拖拽持续移动事件，建议绑定于可拖放区域（下方灰色块）；
@dragenter：进入拖放区域，建议绑定于可拖放区域（下方灰色块），该事件仅在进入拖放区域时触发，在其内部移动时不触发，离开某一可拖放区域后再进入时会再次触发；

注意事项一：不能在被拖拽对象的 dragend 事件中传递消息
在整个拖拽过程中，事件的先后顺序为：

Step1: 拖拽对象的 dropstart；
Step2: 拖放区的 drop；
Step3：拖拽对象的 dropend；
因而，如果在 dragend 中传递消息，是不能被 drop 捕获的。

注意事项二：不能在被拖拽对象的 dragover 事件中传递消息
如果我们在被拖拽对象的 dragover 事件中传递消息，由于 dragover 事件的作用对象是「可拖放区」，即此时，该 dragover 中的 DragEvent 是以「可拖放区」身份施加的，故而不会传递到 drop 中。

注意事项三：消息只能是 String 类型
dataTransfer 中设置的消息（ 即 setData 的第二个参数 ）只能是字符串类型。如果想要传递对象，需要先进行序列化。

注意事项四：Vue 中事件参数
在上面的代码中，如果我们在 @dragstart 中想传递一些参数，如下：

@dragstart="dragstart(item)"
就会遇到一个问题：默认传递的 DragEvent 参数丢失了。

此时，我们需要使用 Vue 的特殊变量来实现事件参数的传递：

@dragstart="dragstart($event, item)"

```js
<div class="item"
     draggable="true"
     @dragstart="dragstart($event, item)"
     @dragend="dragend"
     v-for="(item, index) in items" :key="index"
>
    {{ item.label }}
</div>

<div class="drop-field"
     @drop="drop"
     @dragover.prevent
>
    <div class="item"
         v-if="droppedItem !== ''">
        {{ droppedItem }}
    </div>
</div>


methods: {
    drop (event) {
        this.droppedItem = event.dataTransfer.getData('item')
    },
    dragstart (event, item) {
        event.dataTransfer.setData('item', item.label)
    },
    dragend (event) {
        event.dataTransfer.clearData()
    }
}

```

**拖拽排序**

HTML5新特性实现

```js

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>排序</title>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .box {
      display: flex;
      font-size: 15px;
    }
    .items {
      margin: 20px 30px;
      position: relative;
      background-color: #f6f9fa;
      overflow: hidden;
      border-radius: 4px;
    }
    .item {
      width: 100px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color .3s, color .3s;
      box-sizing: border-box;
      user-select: none;
    }
    .item:hover {
      background-color: #00a1d6;
      color: #fff;
    }
    .select {
      position: absolute;
      background-color: #00a1d6;
      color: #fff;
    }
    .hold {
      border: 1px dashed #ccc;
      box-sizing: border-box;
    }
  </style>
</head>

<body>
  <div class="box"></div>
  <script>
    const $ = selectors => document.querySelector(selectors);
    const $$ = selectors => document.querySelectorAll(selectors);
    const navList = ['小强', '小明', '小红', '小绿', '小白', '小紫', '小强', '小明', '小红', '小绿', '小白', '小紫'];
    const holdItemDom = document.createElement('div');
    holdItemDom.classList.add('item', 'hold');
    const listDom = document.createElement('div');
    listDom.classList.add('items');
    navList.forEach((v, i, arr) => {
      const itemDom = document.createElement('div');
      itemDom.classList.add('item');
      itemDom.dataset.sortindex = i;
      itemDom.textContent = v;
      itemDom.draggable = true;
      listDom.appendChild(itemDom);
    });
    $('.box').appendChild(listDom);
    //主要代码
    var dragObj, enterObj, dragIndex, enterIndex;
    const itemsObj = $('.items');
    itemsObj.addEventListener("drag", function (event) {
      //console.log('drag');
    }, false);

    itemsObj.addEventListener("dragstart", function (event) {
      dragObj = event.target;
      const itemDomList = $$('.items .item');
      itemDomList.forEach((dom, index) => {
        if (dom === dragObj) {
          dragIndex = index;
        }
      });
      event.target.style.opacity = .5;
      console.log('dragstart');
    }, false);
    itemsObj.addEventListener("dragend", function (event) {
      event.target.style.opacity = "";
      console.log('dragend');
    }, false);
    itemsObj.addEventListener("dragover", function (event) {
      event.preventDefault();
      //console.log('dragover');
    }, false);
    document.addEventListener("dragexit", function (event) {
      event.preventDefault();
      console.log('dragexit');
    }, false);

    itemsObj.addEventListener("dragenter", function (event) {
      if (event.target.className === 'item') {
        event.target.classList.add('hold');
      }
      enterObj = event.target;
      const itemDomList = $$('.items .item');
      itemDomList.forEach((dom, index) => {
        if (dom === enterObj) {
          enterIndex = index;
        }
      });
      console.log('dragenter');
    }, false);

    itemsObj.addEventListener("dragleave", function (event) {
      if (/hold/.test(event.target.classList)) {
        event.target.classList.remove('hold');
      }
      console.log('dragleave');
    }, false);
    itemsObj.addEventListener("drop", function (event) {
      event.preventDefault();
      enterObj.classList.remove('hold');
      console.log('drop');
      if (dragIndex < enterIndex) {
        dragObj.remove();
        enterObj.after(dragObj);
      } else if (dragIndex > enterIndex) {
        dragObj.remove();
        enterObj.before(dragObj);
      }
    }, false);
  </script>
</body>

</html>

```

mousedown、mousemove组合实现

```js

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>排序</title>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .box {
      display: flex;
      font-size: 15px;
    }
    .items {
      margin: 20px 30px;
      position: relative;
      background-color: #f6f9fa;
      overflow: hidden;
      border-radius: 4px;
    }
    .item {
      width: 100px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color .3s, color .3s;
      box-sizing: border-box;
      user-select: none;
    }
    .item:hover {
      background-color: #00a1d6;
      color: #fff;
    }
    .select {
      position: absolute;
      background-color: #00a1d6;
      color: #fff;
    }
    .hold {
      border: 1px dashed #ccc;
      box-sizing: border-box;
    }
  </style>
</head>

<body>
  <div class="box"></div>
  <script>
    const $ = selectors => document.querySelector(selectors);
    const $$ = selectors => document.querySelectorAll(selectors);
    const navList = ['小强', '小明', '小红', '小绿', '小白', '小紫', '小强', '小明', '小红', '小绿', '小白', '小紫'];
    const holdItemDom = document.createElement('div');
    holdItemDom.classList.add('item', 'hold');
    const listDom = document.createElement('div');
    listDom.classList.add('items');
    navList.forEach((v, i, arr) => {
      const itemDom = document.createElement('div');
      itemDom.classList.add('item');
      itemDom.dataset.sortindex = i;
      itemDom.textContent = v;
      itemDom.draggable = true;
      listDom.appendChild(itemDom);
    });
    $('.box').appendChild(listDom);
    //主要代码
    var dragObj, enterObj, dragIndex, enterIndex;
    const itemsObj = $('.items');
    itemsObj.addEventListener("drag", function (event) {
      //console.log('drag');
    }, false);

    itemsObj.addEventListener("dragstart", function (event) {
      dragObj = event.target;
      const itemDomList = $$('.items .item');
      itemDomList.forEach((dom, index) => {
        if (dom === dragObj) {
          dragIndex = index;
        }
      });
      event.target.style.opacity = .5;
      console.log('dragstart');
    }, false);
    itemsObj.addEventListener("dragend", function (event) {
      event.target.style.opacity = "";
      console.log('dragend');
    }, false);
    itemsObj.addEventListener("dragover", function (event) {
      event.preventDefault();
      //console.log('dragover');
    }, false);
    document.addEventListener("dragexit", function (event) {
      event.preventDefault();
      console.log('dragexit');
    }, false);

    itemsObj.addEventListener("dragenter", function (event) {
      if (event.target.className === 'item') {
        event.target.classList.add('hold');
      }
      enterObj = event.target;
      const itemDomList = $$('.items .item');
      itemDomList.forEach((dom, index) => {
        if (dom === enterObj) {
          enterIndex = index;
        }
      });
      console.log('dragenter');
    }, false);

    itemsObj.addEventListener("dragleave", function (event) {
      if (/hold/.test(event.target.classList)) {
        event.target.classList.remove('hold');
      }
      console.log('dragleave');
    }, false);
    itemsObj.addEventListener("drop", function (event) {
      event.preventDefault();
      enterObj.classList.remove('hold');
      console.log('drop');
      if (dragIndex < enterIndex) {
        dragObj.remove();
        enterObj.after(dragObj);
      } else if (dragIndex > enterIndex) {
        dragObj.remove();
        enterObj.before(dragObj);
      }
    }, false);
  </script>
</body>

</html>

```

自己的方法(Vue实现)

```js

dragging: function (event) {
  this.drag.moveDom = event.currentTarget
  this.drag.startY = event.clientY
},
drop: function (event) {
  event.preventDefault()
  this.drag.changeDom = event.currentTarget
  this.drag.endY = event.clientY
  if (this.drag.endY - this.drag.startY >= 0) {
    this.$refs.parant.insertBefore(
      this.drag.moveDom,
      this.drag.changeDom.nextSibling
    )
  } else {
    this.$refs.parant.insertBefore(this.drag.moveDom, this.drag.changeDom)
  }
},
allowDrop: function (event) {
  event.preventDefault()
  this.drag.endY = event.clientY
  this.drag.changeDom = event.currentTarget
  if (this.drag.endY - this.drag.startY >= 0) {
    this.$refs.parant.insertBefore(
      this.drag.moveDom,
      this.drag.changeDom.nextSibling
    )
  } else {
    this.$refs.parant.insertBefore(this.drag.moveDom, this.drag.changeDom)
  }
},

// html
<ul ref="parant">
  <li v-for="(list,index) in itemData.body"
      :key="index"
      draggable="true"
      @dragstart="dragging($event)"
      @drop="drop($event)"
      @dragover="allowDrop($event)"
      @click.stop="edit(index)">
  </li>
</ul>

```

### axios统一封装和api接口管理

**async/await**

async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成

async输出的是一个promise对象，如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象

await 等到了它要等的东西，一个 Promise 对象，或者其它值，然后呢？我不得不先说，await 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。

如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。

如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果

箭头函数的几种写法

    异步函数声明： async
     function foo() {}
    异步函数表达式： const
     foo = async function () {};
    异步函数定义：let
     obj = { async foo() {} }
    异步箭头函数： const
     foo = async () => {};
     
## 移动端长按弹窗的逻辑，不需要松开即可弹窗

```js

<script>
export default {
  data() {
    return {
    
      // 在滚动中  就不触发点击
      scrollStatus: false,
      timeId: null,
      holdTime: 1500,
      clickTimeDate: null
    };
  },
  methods: {
    handleClickStart(item, index) {
      this.scrollStatus = false;
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.beforeDelete(item.objectId, index);
      }, this.holdTime);
      this.clickTimeDate = Date.parse(new Date());
    },
    handleClickMove() {
      this.scrollStatus = true;
    },
    handleClickEnd(item) {
      if (this.scrollStatus === true) {
        clearTimeout(this.timeId);
        return;
      }
      const timeRange = Date.parse(new Date()) - this.clickTimeDate;
      if (timeRange < this.holdTime) {
        clearTimeout(this.timeId);
        this.goDetail(item);
      }
    },
    goDetail(data) {
      if (data.website) {
        window.open(data.website);
      } else {
        // this.$store.commit("setActivityContent", data.content);
        this.$router.push({ path: "/activity/detail", query: { id: data.id } });
      }
    },
  }
};
</script>

```

### UI库的按需加载

+ 首先安装UI库： npm i element-ui -S

+ 安装babel-plugin-import插件使其按需加载： npm i babel-plugin-import -D

+ 在.babelrc文件中添加插件配置

```js

libraryDirectory { 
    
    "plugins": [ 
        // 这里是原来的代码部分
        // …………

        // 这里是要我们配置的代码
        ["import", 
            { 
                "libraryName": "vant", 
                "libraryDirectory": "es", 
                "style": true 
            }
        ] 
    ] 
}

```

**vuecli3按需引入elementui**

```js

babel.config.js
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
然后建立一个js文件 放elementui引入的组件
然后mian.js 引入这个js文件

```

### 在当前页面覆盖UI库组件的样式

我们在vue文件的样式都是写在<style lang='scss' scoped></style>标签中的，加scoped是为了使得样式只在当前页面有效，那么问题来了:

![scoped](https://github.com/cwzp990/summary/blob/master/images/scoped.png)

我们正常写都会被加上[data-v-23d425f8]这个属性(如图1)，但是第三方组件内部并没有编译附带[data-v-23d425f8]这个属性。所以我们想要修改组件内的样式，就有点麻烦。

我们可以通过深度选择器来解决：

### 针对只渲染一次之后需要清除的组件

摘自官网：

![once](https://github.com/cwzp990/summary/blob/master/images/$once.png)

这里有两点不好的地方，引用尤大的话就是：

+ 它需要在这个组件实例中保存这个 timer，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物

+ 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化的清理我们建立的所有东西

也就是说，这样做不方便管理，定时器是在data里申明的，却要在下面的钩子里清除，而且data里的数据都是响应式的，这样做无故增加了data的数据，浪费性能。

我们应该这样做

![once](https://github.com/cwzp990/summary/blob/master/images/$once-right.png)

```js

const timer = setInterval(() =>{                    
    // 某些定时器操作                
}, 500);

this.$once('hook:beforeDestroy', () => {            
    clearInterval(timer);                                    
})

```

### router-view中的keep-alive

keep-alive的作用是使被包含的组件保留状态，或避免重新渲染，因为router-view也会被渲染成一个组件，自然它也能被包裹了

若我们只想匹配中router-view其中的一个组件，就需要用到下面的方法

```js

<keep-alive include="a">            // exclude="a"  除了 name 为 a 的组件都将被缓存
  <component>
    <!-- name 为 a 的组件将被缓存！ -->
  </component>
</keep-alive>

// or 使用router.meta属性

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true // 需要被缓存
    }
  }, 
  {
    path: '/:id',
    name: 'edit',
    component: Edit,
    meta: {
      keepAlive: false // 不需要被缓存
    }
  }
]

<keep-alive>
    <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
    </router-view>
</keep-alive>

<router-view v-if="!$route.meta.keepAlive">
    <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
</router-view>

```

这里我们需要注意，当引入keep-alive的时候，页面第一次进入，钩子的触发顺序为created->mounted->activated，退出触发deactivated。当我们再次进入（前进或者后退时，只触发activated）

即keep-alive之后页面模板第一次初始化解析变成html片段后，再次进入就不再重新解析而是读取内存中的数据，即只有当数据变化时，才会使用vurtualDOM进行diff算法更新，所以一般我们不要created部分，把它的逻辑代码写进activated

**地图组件的优化处理**

之前是进入地图页面后进行地图渲染+线路标记，现在是清除以前的线路标记绘制新的线路，性能优化可想而知

```js

export default {
    name: 'transferMap',
    data: function () {
        return {
            map: null,
        }
    },
    methods: {
        initData: function () {},
        searchTransfer: function (type) {},
        // 地图渲染 这个在transfer-map.html中使用
        renderTransferMap: function (transferMap) {}
    },
    mounted () {
        this.map = new AMap.Map("container", {
            showBuildingBlock: true,
            animateEnable: true,
            resizeEnable: true,
            zoom: 12 //地图显示的缩放级别
        });
    },
    activated () {
        let _this = this;
        _this.initData();
        // 设置title
        setDocumentTitle('换乘地图');
        _this.searchTransfer(_this.policyType).then(function (result) {
            // 数据加载完成
            // 换乘地图页面
            let transferMap = result.plans[_this.activeIndex];
            transferMap.origin = result.origin;
            transferMap.destination = result.destination;
            // 填数据
            _this.transferMap = transferMap;
            // 地图渲染
            _this.renderTransferMap(transferMap);
        });
    },
    deactivated () {
        // 清理地图之前的标记
        this.map.clearMap();
    },
}

```

## jq相关

今天有一个功能是jq动态添加input输入框，然后给input加焦点事件，发现普通的方法添加不了，只有第一个有事件，查了谷歌才发现，应该这样写

```js

$('xxx').on('focus', 'input', function(event){
  // 这里通过$(event.target)获取当前点击的对象
})

```

## new Date 转时间戳

new Date().valueOf()和new Date().getTime()
还可以直接+：

```js

let date = new Date()

console.log(+date)

```

## 缓动动画

```js

// targetScroll 目标滚动距离 理由setTimeout控制 最好用 requestAnimtaionFrame
lazyMove(targetScroll) {
  this.request.timeId = setTimeout(() => {
	const curScroll = window.scrollY
	const toScroll = (targetScroll - curScroll) / 2
	// 向上滚动  当前的距离 1000 目标距离0  下一次 就是-500
	// 所以目标滚动距离 - 当前滚动距离是 负数
	// 向下滚动的话 当前距离 1000  目标距离 2000 下一次 就是 +500
	// 所以目标滚动距离 - 当前滚动距离 正数
	// 最后我们要滚动的距离就是 当前的滚动距离 + 下一次的（正/负）滚动距离
	// 你的目标滚动位置是不会变得 所以下次调用还是穿这个目标滚动距离 再算下一次的距离
	if (Math.abs(curScroll - targetScroll) <= 2) {
	  window.scrollTo(0, targetScroll)
	  clearTimeout(this.request.timeId)
	} else {
	  // 下一次的滚动距离 如果是向上 那就减去 向下 那就加上
	  window.scrollTo(0, curScroll + toScroll)
	  this.lazyMove(targetScroll)
	}
  }, 30)

```

## Ueditor

**Ueditor图片直传OSS**

参考 (ueditor 前端直传OSS)[https://blog.csdn.net/u013684276/article/details/80143343#commentBox] 这个讲的比较全 很棒

ueditor.all.js 修改这个 好找

```

// domUtils.on(iframe, 'load', callback);
// form.action = utils.formatUrl(imageActionUrl + (imageActionUrl.indexOf('?') == -1 ? '?':'&') + params);
// form.submit();

// 然后自己改造下
_ajax({
	url: '/api/oss/getUploadUrl',
	headers: {
		Authorization: JSON.stringify({
					deviceType: ,
					// 我们项目要传token
					token: 
				}),
		'Content-Type':'application/x-www-form-urlencolde'    
	},
	sucBack: function(res){
		try {
			 res = JSON.parse(res).body
			 _sendFile(res)
		} catch (error) {

		}
	}
})
// 将图片发送给oss 获取fileId
function _sendFile(data){
	var fData = new FormData();
	fData.append("key", data.key);
	fData.append("success_action_status", "200");
	fData.append("OSSAccessKeyId", data.OSSAccessKeyId);
	fData.append("Signature", data.Signature);
	fData.append("policy", data.policy);
	fData.append("file", input.files[0]);
	_ajax({
		url: '/api/oss/getFileId',// + data.url,
		data: fData,
		sucBack: function(res){
			try {
				res = JSON.parse(res).body
				_getImgLink(res.fileId)
			} catch (error) {
				console.log(error)
			}
		},
		errBack: function(err){
			console.log(err)
		}
	})
}

// 根据fileId获取图片链接
function _getImgLink(id){
	_ajax({
		url: '/api/oss/getImg?fileId=' + id,
		type: 'get',
		sucBack: function(res){
			try {
			// 最后这里是添加到编辑器中的  根据场景需求自己调整
				res= JSON.parse(res).body
				var link = res.link;
				loader = me.document.getElementById(loadingId);
				loader.setAttribute('src', link);
				loader.setAttribute('_src', link);
				loader.setAttribute('title', '');
				loader.setAttribute('alt', '');
				loader.removeAttribute('id');
				domUtils.removeClasses(loader, 'loadingclass');
			} catch (error) {

			}

		},
		errBack: function(err){
			console.log(err)
		}
	})
}

// ajax封装
function _ajax(options){
	var option = options || {}
	option.type = options.type || 'post'
	option.data = options.data || null
	option.url = options.url || ''
	option.headers = options.headers || null
	option.data = options.data || null
	option.sucBack = options.sucBack || null
	option.errBack = options.errBack || null

	var xhr = new XMLHttpRequest()

	xhr.onerror = function(error){
		typeof option.errBack === 'function' && option.errBack(error) 
	}

	xhr.open(option.type, option.url, true)

	if(option.headers){
		for( i in option.headers ){
			if( option.headers.hasOwnProperty( i ) ){
				xhr.setRequestHeader( i, option.headers[i] )
			}
		}
	}

	xhr.send(option.data)

	xhr.onreadystatechange = function stateChange() {
		if (xhr.readyState === 4) {
			if (xhr.status === 304 || (xhr.status >= 200 && xhr.status < 300)) {
				typeof option.sucBack === 'function' && option.sucBack(xhr.responseText) 
			}
		}
	}
}

```

JS获取浏览器缩放比例 // 翻斗鱼的源码看到的

```js

 define("douyu/com/zoom", ["jquery", "shark/observer", "shark/util/cookie/1.0", "shark/util/storage/1.0", "douyu/context", "douyu/com/zoom-dp"], function (e, i, t, n, o, a) {
        var s = {
                storageName: "zoomtip",
                storageVal: "1",
                storageTime: 604800,
                isPop: !1,
                init: function () {
                    this.handleCookie(), this.pop(), i.on("mod.layout.screen.change", function (e) {
                        s.detect() && s.pop()
                    })
                }, handleCookie: function () {
                    t.get(this.storageName) && (t.remove(this.storageName), n.set(this.storageName, this.storageVal, this.storageTime))
                }, detect: function () {
                    return this.ua = navigator.userAgent.toLowerCase(), -1 == this.ua.indexOf("windows") ? !1 : !n.get(this.storageName)
                }, cal: function () {
                    var e = 0,
                        i = window.screen;
                    return void 0 !== window.devicePixelRatio ? e = window.devicePixelRatio : ~this.ua.indexOf("msie") ? i.deviceXDPI && i.logicalXDPI && (e = i.deviceXDPI / i.logicalXDPI) : void 0 !== window.outerWidth && void 0 !== window.innerWidth && (e = window.outerWidth / window.innerWidth), e && (e = Math.round(100 * e)), 99 !== e && 101 !== e || (e = 100), e
                }, resize: function () {
                    var i = this.cal();
                    if (this.isPop && i && 100 == i) return void this.close();
                    var t = 540,
                        n = 432,
                        o = 100 * t / i,
                        a = 100 * n / i;
                    e(".pop-zoom-container").css({
                        width: o + "px",
                        height: a + "px",
                        marginLeft: -o / 2 + "px",
                        marginTop: -a / 2 + "px"
                    })
                }, pop: function () {
                    var t = this.cal();
                    if (!n.get(this.storageName) && !this.isPop && 100 !== t) {
                        var a = o.get("sys.web_url") + "app/douyu/res/com/sg-zoom-error.png?20160823",
                            s = ['<div class="pop-zoom-container">', '<div class="pop-zoom">', '<img class="pop-zoom-bg" src="', a, '">', '<div class="pop-zoom-close">close</div>', '<div class="pop-zoom-hide"></div>', "</div>", "</div>"].join("");
                        e("body").append(s), this.bindEvt(), this.isPop = !this.isPop, i.trigger("dys.com.zoom.pop.show")
                    }
                    this.resize()
                }, close: function () {
                    e(".pop-zoom-container").remove(), this.isPop = !this.isPop, i.trigger("dys.com.zoom.pop.close")
                }, bindEvt: function () {
                    var t = this;
                    e(".pop-zoom-close").on("click", function () {
                        t.close()
                    }), e(".pop-zoom-hide").on("click", function () {
                        n.set(t.storageName, t.storageVal, t.storageTime), i.trigger("dys.com.zoom.pop.zoomtip"), t.close()
                    })
                }
            },
            r = function () {
                s.detect() && s.init()
            };
        e(r)
    })

var getScreenScaleNum = function () { 
	var e = 0, i = window.screen; 
	return void 0 !== window.devicePixelRatio ? e = window.devicePixelRatio : ~this.ua.indexOf("msie") ? i.deviceXDPI && i.logicalXDPI && (e = i.deviceXDPI / i.logicalXDPI) : void 0 !== window.outerWidth && void 0 !== window.innerWidth && (e = window.outerWidth / window.innerWidth), e && (e = Math.round(100 * e)), 99 !== e && 101 !== e || (e = 100), e 
}

```

## 纯css写的三角形

```js

<div class="test_triangle_border">
    <a href="#">三角形</a>
    <div class="popup">
        <span><em></em></span>纯CSS写带边框的三角形
    </div>
</div>

.test_triangle_border{
    width:200px; 
    margin:0 auto 20px;
    position:relative;
}
.test_triangle_border a{
    color:#333;
    font-weight:bold; 
    text-decoration:none;
}
.test_triangle_border .popup{
    width:100px;
    background:#fc0; 
    padding:10px 20px; 
    color:#333;  
    border-radius:4px;
    position:absolute; 
    top:30px; 
    left:30px;
    border:1px solid #333;
}
.test_triangle_border .popup span{
    display:block; 
    width:0; 
    height:0; 
    border-width:0 10px 10px; 
    border-style:solid; 
    border-color:transparent transparent #333; 
    position:absolute; 
    top:-10px; 
    left:50%;/* 三角形居中显示 */
    margin-left:-10px;/* 三角形居中显示 */
}
.test_triangle_border .popup em{
    display:block; 
    width:0; 
    height:0; 
    border-width:0 10px 10px; 
    border-style:solid; 
    border-color:transparent transparent #fc0; 
    position:absolute; 
    top:1px; 
    left:-10px;
}

```

## node相关

node是一种事件驱动的非阻塞I/O

什么叫事件驱动的非阻塞I/O呢？

操作系统内核对I/O()只有两种方式：阻塞与非阻塞。在调用阻塞I/O时，应用程序需要等待I/O完成才会返回结果。阻塞I/O的一个特点是调用之后一定要等到系统内核层面完成所有操作后，调用才结束。阻塞I/O造成了cpu等待I/O，浪费等待时间，cpu的处理能力不能得到充分的利用，为了提高性能，内核提供了非阻塞I/O，调用之后立即返回。

非阻塞I/O也存在一些问题，它返回的并不是业务层期望的数据，而是当前调用的状态，为了获得完整的数据，应用程序需要重复调用I/O操作来确认是否完成，这就是轮询。

任何技术都不是完美的，阻塞I/O带来的是cpu资源的浪费，而非阻塞I/O则是需要轮询去确认是否完全完成数据获取，它会让cpu处理状态判断，这也是对cpu资源的浪费。

**理想的非阻塞I/O**

我们期望的是应用程序发起非阻塞调用，无须通过遍历或事件唤醒等方式轮询，可以直接处理下一个任务，只需在I/O完成后通过信号或回调将数据传递给应用程序即可。

**现实中的异步I/O**

理想总是美好的，但是我们可以用另一种方式来实现异步I/O

前面我们所说的都是单线程，但是在多线程下，通过让部分线程进行阻塞I/O或非阻塞I/O加轮询技术来完成数据获取，让一个线程进行计算处理，通过线程之间的通信将I/O得到的数据进行传递，这样就轻松实现了异步I/O！

![mock-pic2](https://github.com/cwzp990/summary/blob/master/images/node-异步io.png)

**事件循环**

node的执行模型————事件循环

在进程启动时，node便会创建一个类似while(true)的循环，每执行一次循环体的过程，我们称为tick。每个tick的过程就是查看是否有事件待处理，如果有，就取出事件及其相关的回调函数，如果存在关联的回调，就执行他们，然后进入下一个循环，如果不再有事件处理，就结束进程。

每个tick的过程中，如何判断是否有事件需要处理呢？这里就需要引入观察者，每个事件循环中有一个或多个观察者，而判断是否有事件要处理的过程就是向这些观察者询问是否有需要处理的事件。

![mock-pic2](https://github.com/cwzp990/summary/blob/master/images/node-异步io流程.png)

**异步编程**

利用事件循环的方式,JS像一个分配任务和处理结果的管家，I/O线程池里的各个I/O线程都是小二，负责兢兢业业地完成分配来的任务，小二与管家互不依赖，所以可以保持整体的高效率。这个模型的缺点在于管家无法承担过多的细节性任务，如果承担太多，则会影响到任务的调度，管家忙个不停，小二却得不到活干，结局就是效率整体降低。

node是为了解决编程模型中阻塞I/O的性能问题的，采用了单线程模型，这导致node更像一个处理I/O密集问题的能手，而cpu密集型则取决于管家的能耐如何。而node是基于v8引擎开发的，v8(c)性能方面可以说是很不错的。由于事件循环模式需要应对海量请求，海量请求同时作用于单线程上，就需要防止任何一个计算耗费过多的cpu时间片。至于是计算密集型还是I/O密集型，只要计算不影响异步I/O的调用，那就不构成问题。或者将大量的计算分解为诸多的小量计算，通过setImmediate()进行调度，合理利用node的异步模型与V8的高性能，就可以充分发挥cpu和I/O资源的优势。

## 服务器相关

**直接部署**

1.首先安装wget

yum install -y wget
1.如果已经安装了可以跳过该步

2.下载nodejs最新的bin包

可以在下载页面https://nodejs.org/en/download/中找到下载地址。然后执行指令

wget https://nodejs.org/dist/v9.3.0/node-v9.3.0-linux-x64.tar.xz

然后就是等着下载完毕。

另外你也可以在你喜欢的任意系统上下载最新的bin包，然后通过FTP上传到CentOS上。

3.解压包

依次执行

xz -d node-v9.3.0-linux-x64.tar.xz
tar -xf node-v9.3.0-linux-x64.tar

4. 部署bin文件

先确认你nodejs的路径，我这里的路径为~/node-v9.3.0-linux-x64/bin。确认后依次执行

ln -s ~/node-v9.3.0-linux-x64/bin/node /usr/bin/node
ln -s ~/node-v9.3.0-linux-x64/bin/npm /usr/bin/npm

注意ln指令用于创建关联（类似与Windows的快捷方式）必须给全路径，否则可能关联错误。

5.测试

node -v
npm

如果正确输出版本号，则部署OK

这种安装的方法好处是比较干净，安装也比较快速。个人认为比较适合新手。但是如果遇到nodejs插件全局安装时，需要自行去创建关联，参考第4步。

**编译部署**

1.安装gcc，make，openssl，wget

yum install -y gcc make gcc-c++ openssl-devel wget

2.下载源代码包

同样的，你可以在下载页面https://nodejs.org/en/download/中找到下载地址。然后执行指令

wget https://nodejs.org/dist/v9.3.0/node-v9.3.0.tar.gz

3.解压源代码包

tar -xf node-v9.3.0.tar.gz

4.编译

进入源代码所在路径

cd node-v9.3.0

先执行配置脚本

./configure

编译与部署

make && make install

接着就是等待编译完成…

5.测试

node -v
npm

如果正确输出版本号，则部署OK

这种方式安装，个人觉得比较有点麻烦，还有安装gcc等其他程序，对应新人来说可能比较晕。而且编译比较久，切部署完成后nodejs为分别放在好几个文件夹内：

/usr/local/bin –放置nodejs 执行程序
/usr/lib –放置了node_modules，即nodejs的各种模块
/usr/include –放置了nodejs扩展开发用头文件
优点是全局安装nodejs模块，直接使用。
