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

## 4. 前端mock数据

json-server：https://github.com/typicode/json-server
![mock-pic1](https://github.com/cwzp990/summary/blob/master/images/mock1.jpg)
![mock-pic2](https://github.com/cwzp990/summary/blob/master/images/mock2.png)

## 5. 单页面应用加载性能优化

原文地址：https://mp.weixin.qq.com/s/KxJttCVuCoIrm9RAjRBrdg?appinstall=0

## 6. echarts相关

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

 
3）关于优化

https://juejin.im/post/5b0033c9518825056508075f

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

```js

//  router/index.js
{
  path: '/details',
  name: 'details',
  component: home
}

//  vue
this.$router.push({
  name: 'detail',     // 如果你使用了name，就不能在这里写path了！！！另外这里是router！！！不是route！！！
  params: {
    name: 'xxxx',
    code: 'xxxx'
  }
})

//  取值
this.$route.params.name

注意 params是路由的一部分，必须要有，而query是拼接在url后面的参数，没有也没关系。
params一旦设置在路由，params就是路由的一部分，如果这个路由有params传参，但是在跳转的时候没有传参，会导致跳转失败或页面没有内容

params、query不设置也可以传参，但是params不设置的时候，刷新页面或返回参数会丢失，query不会。

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
