# summary
这里是工作中遇到的一些问题，以及相应的解决方法！

## 1. vue项目初次加载动画怎么做?

一般做法，是在入口的html文件里直接添加你要的加载提示，让它在页面刚开始加载的时候默认显示，而隐藏主页面的root标签。再在vue项目的入口vue里的created或mounted里将加载提示的标签删除或隐藏，再将主页面root标签显示。

入口HTML文件：

```
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

```
function eConsole(param) {

  console.log(param.dataIndex)  // 当前点击的索引
  clickFunc(param.dataIndex)    // 执行点击效果
}

myChart.on("click", eConsole);
```

### 在同一个容器中显示饼图和柱图切换，柱图切换饼图时留有坐标轴：

切换option设置时，将show置为false

```
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

```

props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}

```

2.prop值需要经过转化后使用：

```

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

```

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

## jq相关

今天有一个功能是jq动态添加input输入框，然后给input加焦点事件，发现普通的方法添加不了，只有第一个有事件，查了谷歌才发现，应该这样写

```

$('xxx').on('focus', 'input', function(event){
  // 这里通过$(event.target)获取当前点击的对象
})

```