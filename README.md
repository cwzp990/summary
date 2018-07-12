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

### 2. 
