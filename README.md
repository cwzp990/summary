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

**懒加载**

(前端技术周刊 2018-12-24：移动无限加载)[https://segmentfault.com/a/1190000017893879]

滚动事件

(移动 Web 的滚动)[http://www.alloyteam.com/2017/04/secrets-of-mobile-web-scroll-bars-and-drop-refresh/]
(高性能滚动及页面渲染优化)[http://web.jobbole.com/86158/]
(移动端滚动事件大起底)[https://github.com/merrier/mobile-scroll-events]

懒加载

(Lazyload 三种实现方式)[https://zhuanlan.zhihu.com/p/25455672]
(懒加载和预加载)[https://www.jianshu.com/p/4876a4fe7731]

无限滚动

(React 之无限滚动)[https://zhuanlan.zhihu.com/p/32075662]
(Vue.js 一个超长列表无限滚动加载的解决方案)[https://juejin.im/entry/5819993fbf22ec0068aab054]
(设计高性能无限滚动加载，了解高效页面秘密)[https://zhuanlan.zhihu.com/p/25767226]
(设计模式之享元模式)[https://www.cnblogs.com/TomXu/archive/2012/04/09/2379774.html]

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

### substring、 substr、 slice

	substr(start [, length])
	substring(start [, end])
	slice(start [, end])

substring 有个神奇的地方 就是 start， end ，两个参数 谁小 谁就是 start

```js

   var str = 'My name is: Jerry . My age is: 12 . : :666 .';
   str.substring( 0, 5 )
   "My na"
   var str = 'My name is: Jerry . My age is: 12 . : :666 .';
   str.substring( 5, 0 )
   "My na"
substr 和 slice 如果遇到负数 会 和 length 相加
   var str = 'My name is: Jerry . My age is: 12 . : :666 .';
   str.slice( 0, 5 )
   "My na"
   var str = 'My name is: Jerry . My age is: 12 . : :666 .';
   str.slice( 0, -5 )
   "My name is: Jerry . My age is: 12 . : :"
   str.length
   44
   str.slice(0, 39)
   "My name is: Jerry . My age is: 12 . : :"

```

从定义上看： substring和slice是同类的，参数都是字符串的某个｛开始｝位置到某个｛结束｝位置（但｛结束｝位置的字符不包括在结果中）；而substr则是字符串的某个｛开始｝位置起，数length个长度的字符才结束。－－ 共性：从start开始，如果没有第2个参数，都是直到字符串末尾
substring和slice的区别则是，slice可以接受“负数”，表示从字符串尾部开始计数； 而substring则把负数或其它无效的数，当作0。
substr的start也可接受负数，也表示从字符串尾部计数，这点和slice相同；但substr的length则不能小于1，否则返回空字符串。

### 少用ID,会增加全局变量

```js

<!-- 全局 DOM 变量 -->
<!-- 由于浏览器历史遗留问题，在创建带有 id 属性的 DOM 元素的时候也会创建同名的全局变量： -->
<!-- windows下的全局变量不会被ID的全局变量覆盖 -->

<div id='foo'><div>
<scripts>
   console.log(foo)     // 打印出DOM元素
	
	const el = document.createElement('div')
	el.id = 'scrollX'
	document.body.appendChild(el)
	window.scrollX // 0
</scripts>

```

### isNaN

```js

var str = '';
isNaN( str ); // false
Number( str ); // 0

var num = 0;
isNaN( num ); // false

//isNaN() 底层会将字符串先转成数字类型 
isNaN( '666' ) // false

```

### Array.sort
```js

// 比如一个数组 
let arr = [1, 23, 4, 5, 6, 8, 9, 1,0 ,11, 5, 666, -1, -1, -1 ];
// 需求是 按照升序排列 但是-1必须在最后

arr.sort( (a, b)=>{
	a < 0 && (a = Number.POSITIVE_INFINITY);
	b < 0 && (b = Number.POSITIVE_INFINITY);
	return a - b
} )

arr.sort( (a, b)=>{
  a < 0 || b < 0 && ( a *= -1, b *=-1 );
  return a - b
} )

// 位运算
arr.sort( (a, b) => !~a || !~b ? b : a - b ) 

// sort方法会修改原始数组 使用之前最好拷贝一下原数组

```

### 对象拍平

```js

var m = { "a": 1, "b": { "c": 2, "d": [3, 4] }, "e": { f: { g: "6" } } };
function spreadJSON (result, json, parentKey) {
      const keys = Object.keys(json);
      keys.forEach(key => {
        const value = json[key];
        const concatKey = parentKey + (parentKey ? '.' : '') + key;
        if (Object.prototype.toString.call(value) === '[object Object]'){ 
			spreadJSON (result, value, concatKey)
		}else {
			result[concatKey] = value
		};
      })
      return result;
    }
	
spreadJSON ({}, m, '')

{a: 1, b.c: 2, b.d: Array(2), e.f.g: "6"}

```

### es6 class extends 的 super

子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象
其实 super(…) 做的事情就是生成一个 this。因为在原型继承中，如果一个类要继承自另一个类，那就得先实例化一次它的父类作为作为子类的原型。如果不做这件事，子类的原型就不能确定，当然也就无法创建 this。所以如果在 constructor 中没有 super(…) 就企图获取 this 就会报错

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

### 百度地图等需要根据key来引入不同大量图片的解决方案

比如我有十几二十种key，每个key对应一个图片，后端返回不同的key，我要展示不同的图片，而且如果图片不存在，那么展示一个默认图片。
如果一个一个require图片进来，很麻烦，不科学，不自动，于是我想到了一种解决方案，将图片放入public文件夹（静态资源不用laoder加载）
// 基础图片路径 这个是放在public文件夹下的  public/images/gateway....
// 这里一定要用相对路径 用绝对路径的话 打包之后会受路径影响不显示 亲测
const basicImg = "images/gateway/basic.png";
const imgUrl = "images/gateway/";
// 然后图片的命名与后端传来的key对应 比如 key是gateway 你的图片名字就是 gateway.png

// 那么如何判断图片能否正常加载呢？  就用new Image 去构造一个图片对象

```js

export default {
	methods:{
		// 这个方法用来检测图片是否可用
		createImg(src) {
		      return new Promise((resolve, reject) => {
			let img = new Image();
			img.src = src;
			img.onload = () => {
			  img = null;
			  resolve();
			};
			img.onerror = () => {
			  img = null;
			  reject(new Error("没有图片"));
			};
		      });
		},
		// 将图片生成markder 这里面有我相关的业务逻辑 
		async createMarker(data) {
		      const lng = data.longitude;
		      const lat = data.latitude;
		      let iconImg = null;
		      const url = imgUrl + data.type + ".png";
		      await this.createImg(url)
			.then(() => {
			  iconImg = url
			})
			.catch(() => {
			  iconImg = basicImg;
			});
		      let marker = new BMap.Marker(new BMap.Point(lng, lat), {
			icon: new BMap.Icon(iconImg, new BMap.Size(100, 100)),
			enableClicking: true
		      }); // 创建标注
		      marker.htData = data;
		      marker.removeEventListener("click", this.showTerminalWindow);
		      marker.addEventListener("click", this.showTerminalWindow);
		      return marker;
		},
		// 这里有个注意点 我踩了个坑 自己不理解async   async返回的也是个promise对象  哈哈 
		addMarkerToMap(arr) {
		      const newArr = arr.filter(v => {
			return v.longitude && v.latitude;
		      });
		      this.markerWindow = [];
		      newArr.forEach((v, k) => {
		      // 一开始直接添加到map中 都是空的 async返回的也是个promise 哦！
			this.createMarker(v)
			  .then(markder => {
			    this.map.addOverlay(markder);
			  })
			  .catch(() => {});
		      });
		},
	}	
}
另外 如果我们需要key引入图片的话可以使用这种方式
<template>
	<img :src="require(`@img/service/${item.feesStandardCode}.png`)"
            :alt="item.feesStandardName" />
</template>
或者
<template>
	<div :style="{background: require(`@img/service/${item.feesStandardCode}.png`)}"
            :alt="item.feesStandardName" />
</template>

```

### 百度地图和浏览器定位的封装

```js

// 百度地图右键点击事件是 `rightclick`
import BMap from "BMap";

export default {
  methods: {
    // 将获取的位置解析为百度API
    translatePoint(x, y) {
      return new Promise((resolve, reject) => {
        const point = new BMap.Point(x, y);
        const convertor = new BMap.Convertor();
        let pointArr = [];
        pointArr.push(point);
        convertor.translate(pointArr, 1, 5, data => {
          if (data.status === 0) {
            resolve(data);
          } else {
            reject(new Error("坐标转换失败"));
          }
        });
      });
    },
    // 封装获取位置API方法
    promiseGeo() {
      return new Promise((resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition(
          data => {
            data.coords && resolve(data);
          },
          err => {
            reject(err);
          },
          { timeout: 2000 }
        );
      });
    },
    // 坐标解析成地址
    position2Address(position) {
      return new Promise((resolve, reject) => {
        const myGeo = new BMap.Geocoder();
        myGeo.getLocation(position, rs => {
          var addComp = rs.addressComponents;
          if (addComp) {
            resolve(addComp.province);
          } else {
            reject(new Error());
          }
        });
      });
    },
    // 地址解析成坐标
    address2Position(address) {
      return new Promise((resolve, reject) => {
        const myGeo = new BMap.Geocoder();
        myGeo.getPoint(address, point => {
          point ? resolve(point) : reject(new Error("您的位置没有解析到结果"));
        });
      });
    },
    // 根据用户信息所在的省份设置默认展示的省份
    setPositionByAddress(address) {
      this.address2Position(address).then(data => {
        this.map.setCenter(data);
      });
    },
    createContextMenu(menuArr = []) {
      const menu = new BMap.ContextMenu();
      menuArr.forEach(v => {
        menu.addItem(new BMap.MenuItem(v.name, v.callback, 100));
      });
      this.map.addContextMenu(menu);
    }
  }
};

```

### 百度地图画块逻辑

```js

{
	/**
     *
     * 添加地块的逻辑
     */
    // 弹窗点击确认后 获取弹窗中的数据
    getPolygonData(data) {
      this.mapStatus = "edit";
      this.curPointArr = [];
      // 先实例化一个区域范围
      this.createPolygon(data);
      // 监听地图点击事件 给这个范围加点 圈选开始 开始编辑  添加这些点
      this.map.addEventListener("click", this.updatePolygonPoint);
    },
    //
    updatePolygonPoint(event) {
      // 如果点的是拖动的点 不加
      if (event.domEvent.target.className === "BMap_vectex BMap_vectex_node") {
        return;
      }
      this.curPointArr = this.curPolygon.getPath();
      // 每次点击改变这个实例化的
      this.curPointArr.push(event.point);
      this.curPolygon.setPath(this.getPolygonPath());
      this.curPolygon.enableEditing();
    },
    // 创建点
    createPolygon(data) {
      const polygon = new BMap.Polygon(this.getPolygonPath(), {
        strokeColor: data.color,
        strokeWeight: 1,
        strokeOpacity: 1,
        fillColor: data.color,
        fillOpacity: 0.4
      });
      polygon.htData = data;
      this.map.addOverlay(polygon);
      polygon.enableEditing();
      this.addPolygonEvent(polygon);
      this.curPolygon = polygon;
    },
    // 将点解析为可以画圈的点
    getPolygonPath() {
      return this.curPointArr.map(v => {
        const { lng, lat } = v;
        return new BMap.Point(lng, lat);
      });
    }
}

```

### echarts 半环形进度条
例子地址 复制上去配置项

```JS
option = {
    tooltip: {
        formatter: "{a} <br/>{b} : {c}"
    },
    series: [{
        //类型
        type: 'gauge',
        //半径
        radius: 180,
        //起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        //结束角度。
        endAngle: 0,
        center: ['50%', '50%'],
        //仪表盘轴线相关配置。
        axisLine: {
            show: true,
            // 属性lineStyle控制线条样式
            lineStyle: {
                width: 40,
                color: [
                    [0.6, '#3ebfff'],
                    [1, '#f5f5f5']
                ]
            }
        },
        //分隔线样式。
        splitLine: {
            show: false,
        },
        //刻度样式。
        axisTick: {
            show: false,
        },
        //刻度标签。
        axisLabel: {
            show: true,
            distance: -20,
            lineHeight: 100,
            color: '#000',
            formatter: function( params ){
                if( params == 0  ){
                    return '\n\n\n\v\v' + 0
                }else if( params == 100 ){
                    return '\n\n\n\v' + 100
                }else{
                    return ''
                }
            }
        },
        //仪表盘指针。
        pointer: {
            //这个show属性好像有问题，因为在这次开发中，需要去掉指正，我设置false的时候，还是显示指针，估计是BUG吧，我用的echarts-3.2.3；希望改进。最终，我把width属性设置为0，成功搞定！
            show: false,
            //指针长度
            length: '90%',
            width: 0,
        },
        //仪表盘标题。
        title: {
            show: true,
            offsetCenter: [0, '-25%'], // x, y，单位px
            textStyle: {
                color: '#000',
                fontSize: 12
            }
        },
        //仪表盘详情，用于显示数据。
        detail: {
            show: false,
            offsetCenter: [0, '-10%'],
            formatter: '{value}',
            textStyle: {
                fontSize: 12
            }
        },
        data: [{
            value: '',
            name: '60%',
        }]
    }]
};

```

### 移动端返回页面不刷新解决方案

https://www.jianshu.com/p/a8ecfb73a22a

  // 点击浏览器返回按钮，404页面刷新
 window.addEventListener('pageshow', function (event) {
//event.persisted属性为true时，表示当前文档是从往返缓存中获取
  if (event.persisted) location.reload();
 });

### html中url路径请求的六种方式：无斜杠、单斜杠（/）、点+单斜杠（./）、点点+单斜杠（../）、多个点点+单斜杠（../../）、全路径

没有斜杠，跳转到和自己（rootPath.html）同目录下的layout页面
单斜杠加前有一点，跳转到和自己（rootPath.html）同目录下的layout页面 总结：方式一和方式二效果是相同的。
单斜杠，跳转到整个网站根目录下
两点加单斜杠，跳转到上一级目录
多个两点加单斜杠连续用，每一次“../”往上跳转一级,有几个“
全路径方法：路径+项目名+文件在wbapp下的位置

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

### vue中有时候清除某个列表 在赋值前再清除会有效点

```js

// 有效清空 不会导致数据遗留
loadData().then(res=>{
	this.dataList = []
	this.dataList = res.map(v=>{ v.name = 1; return v})
})

// 有时候会无效清空 导致数据遗留
this.dataList = []
loadData().then(res=>{	
	this.dataList = res.map(v=>{ v.name = 1; return v})
})

```

### vue extends extend minxins mixin
extends 和 mixins 是用在单页面（不一定准确）中
extends可以继承vue文件
mixins继承js文件
extend mixin 是全局的 具体区别和用法看文档 还是和带s的有差别的
extends只能继承一个 mixins可以继承多个
extends并不能继承template 因为 组件没暴露template 哈哈

### vue中如果接口返回的字段和你默认的字段中有缺失， 不能直接赋值，会不能修改

比如你的默认字段是
form={
	name:'',
	password: ''
}
但是接口返回的没有password，如果你this.form = res.data会导致password无法编辑，老版本不会这样
你可以给res补充上这个字段 或者用Object.assign

### vue按钮权限控制的一个思路
从0到1搭建element后台框架之权限篇
按钮级别的权限说实话一般都通过数据接口来控制是否展示，点击等等情况。如果光有前端来控制绝对不是可行之道。
项目中按钮权限注册全局自定义指令来完成的。首先src下面新建一个directive文件夹，用于注册全局指令。在文件夹下新建一个premissionBtn.js。如果对自定义指令不熟的话可以查阅官方文档。
全局指令

```js

import Vue from 'vue'
    import store from '@/store/store'
    //注册一个v-allowed指令
     Vue.directive('allowed', {
        inserted: function (el, bingding) {
            let roles = store.getters.roles
            //判断权限
            if (Array.isArray(roles) && roles.length > 0) {
                let allow = bingding.value.some(item => {
                    return roles.includes(item)
                })
                if (!allow) {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el)
                    }
                }
            }
        }
    })
引用
 import './directive/premissionBtn'
那自定义指令如何使用呢？
 <div class="premissionBtn">
        <el-button type="primary" v-allowed="['admin']">我是只有admin的时候才能显示</el-button>
        <br>
        <el-button type="info" v-allowed="['user']">我是只有user的时候才能显示</el-button>
        <br>
        <el-button type="warning" v-allowed="['admin','user']">我是admin或者user才能显示</el-button>
        <br>
        <el-button type="danger">任何角色都可以显示</el-button>
    </div>
    
```

vue-cli import 中大小写的有意思之处
未测试是es6的规则还是vue-cli或者webpack的关系
import AppUseChart from './appUseChart' 默认当成文件夹 会查找里面的index.vue
而import AppUseChart from './AppUseChart' 会当成.vue组件

### Vue ElementUI 的导航栏刷新后默认选择的没了

```js

	<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
		<!-- 设置成route模式 然后设置默认选择的路由 -->
        <el-menu :default-openeds="openIndex" :router="true" :default-active="this.$route.path">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>导航一</template>
                <el-menu-item-group>
                <template slot="title">分组一</template>
				<!-- 设置成route模式 index设置成路由 -->
                <el-menu-item index="/table" >表格1
                </el-menu-item>
                <el-menu-item index="/table2">表格2
                </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </el-aside>
    
```

### 8. vue-router router-link阻止跳转的一个方案

利用tag属性，将router-link渲染成a或别的跳转功能标签之外的标签（修改默认右键菜单也行）
不需要跳转的to属性设置一个固定的路由链接
在页面级组件中，利用路由守卫拦截2中的路由连接即可

### 9、vue多层传递数据和事件 $attrs/$listeners

https://www.cnblogs.com/mengfangui/p/9995470.html

组件传值一般是通过props传值的。inheritAttrs默认值为true，true的意思是将父组件中除了props外的属性添加到子组件的根节点上(说明，即使设置为true，子组件仍然可以通过$attr获取到props意外的属性)

inheritAttrs:false后（请将fatherDom.vue添加inheritAttrs:false），coo属性就不会显示在fatherDom根节点上了。但是怎么获取到coo呢？这时就通过$attrs获取到到coo。

爷爷

<Father :datas="666" />

父

<Child v-on="$attrs" v-on="$listeners"/>

子

<div>{{datas}}</div>

{

props: [datas]}

### 10. 为什么vue-cli中只需要实例化一次vue?

export default 的是一个对象 Object，然后父组件通过 components 属性注册，其实是内部调用了 Vue.extend 方法，把这个 Object 传入，然后得到的也是一个 Vue 的实例。为啥用 Vue.extend 而不是直接new Vue，因为他们要建立父子关系，形成一个 Vue 的组件树。
组件里的 data 必须是一个方法，因为组件是多个实例，如果 data 是一个同一个 object，那么一个组件的修改会影响另一个，因此它必须返回一个方法。


## 11. 如何编写优化的JavaScript

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

### 深拷贝的注意点
对象的属性值是函数时，无法拷贝。
原型链上的属性无法获取
不能正确的处理 Date 类型的数据
不能处理 RegExp
会忽略 symbol
会忽略 undefined

```js
function deepClone(obj) { //递归拷贝
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    if(obj === null || typeof obj !== 'object') {
        //如果不是复杂数据类型，直接返回
        return obj;
    }
    /**
     * 如果obj是数组，那么 obj.constructor 是 [Function: Array]
     * 如果obj是对象，那么 obj.constructor 是 [Function: Object]
     */
    let t = new obj.constructor();
    for(let key in obj) {
        //如果 obj[key] 是复杂数据类型，递归
        if(obj.hasOwnProperty(key)){//是否是自身的属性
            t[key] = deepClone(obj[key]);
        }
    }
    return t;
}

```

### 前端下载文件常见的两种方式

ajax
// 请求的responsetype设置为 responseType: 'blob'
// 剩下的参考90那条
form表单下载
参考 隐藏form表单下载文件

```js

function downloadFile(actoinURL,filePath,fileName){  
<span style="white-space:pre;"> </span>var form = $("<form>");     
    $('body').append(form);    
        form.attr('style','display:none');     
        form.attr('target','');  
        form.attr('method','post');  
        form.attr('action',actoinURL);//下载文件的请求路径  
          
          
        var input1 = $('<input>');   
        input1.attr('type','hidden');   
        input1.attr('name','filePath');   
        input1.attr('value',filePath);  
        form.append(input1);    
        var input2 = $('<input>');   
        input2.attr('type','hidden');   
        input2.attr('name','fileName');   
        input2.attr('value',fileName);  
        form.append(input2);  
          
        form.submit();      
      
    }; 

```

## label for

给 label指定for 对应input或者别的form元素 即使label不包裹着for 也会触发该元素的聚焦 for把两个不包裹的元素关联了起来
而label包裹上的元素不需要写for也可以聚焦

### JS中的label

start 在ES5中并没有建立作用域
start: {
	console.log(1);	
	console.log(2);
	break start
	console.log(3);
}
// 1 2 
还有双重for循环的场景 有兴趣可以MDN看一下

### 阿里网页支付跳转

```js

confirmPay(data) {
      this.pageLoading = true;
      const newTab = window.open();
      const div = document.createElement("div");
      aliPayApi
        .getPayPage({
          dePoint: data.dePoint,
          feesSetMealBeans: this.getSendData()
        })
        .then(res => {
          res = res.data;
          div.innerHTML = res.orderInfo;
          newTab.document.body.appendChild(div);
          newTab.document.forms[0].submit();
          this.pageLoading = false;
	  
          this.back();
        })
        .catch(() => {
          this.pageLoading = false;
        });
    }
    
```

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

**Vue-Router新开页面**

```js

const routeData = this.$router.resolve({
  path: lang ? `/${lang}/news/detail` : `news/detail`,
  query: { id }
})
window.open(routeData.href, '_blank')

```

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

### 同一个浏览器多个tab页面如何登入同一个项目不同角色
localstorage配合用户id方案，不行 即便可以通过用户id区分用户的token，但是一旦刷新，这个用户的id就不知道了（id用本地存储存下来也无法鉴别），除非重新登录，
sessionstorage 后端token没失效，用户需要重新登录，新页面打开token也失效
cookie和localstorage一样道理
如果要做需要后端配合 静默登录

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


### 移动端遮罩穿透

```js

/**
  * ModalHelper helpers resolve the modal scrolling issue on mobile devices
  * https://github.com/twbs/bootstrap/issues/15852
  * requires document.scrollingElement polyfill https://github.com/yangg/scrolling-element
  */
var ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open');

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

### vue中有时候清除某个列表 在赋值前再清除会有效点

```js

// 有效清空 不会导致数据遗留
loadData().then(res=>{
	this.dataList = []
	this.dataList = res.map(v=>{ v.name = 1; return v})
})

// 有时候会无效清空 导致数据遗留
this.dataList = []
loadData().then(res=>{	
	this.dataList = res.map(v=>{ v.name = 1; return v})
})

```

### 单页面过渡动画过渡过程要设置absolute还要有位置，这样才不会抖动

```js

.ht-filter-enter-active,
.ht-filter-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transform: translate3d(0, 0, 0);
  transition: opacity 0.5s, filter 0.5s;
}
.ht-filter-enter,
.ht-filter-leave-to {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transform: translate3d(0, 0, 0);
  filter: blur(8px);
  opacity: 0;
}

```

### transition动画过程中多个子重叠优先级问题（鼠标右移和左移显示效果不一样）

大概就是这样一个场景 一个列表 五个li 然后鼠标放上去放大 放大后的要遮住旁边的li 鼠标从左往右的时候，即将开始动画的在即将结束动画的DOM结构之上，而从右往左，是结束的在上面 开始的在下面，于是利用z-index的方案来解决了这个问题

```js

li {
      position: relative;
      z-index: 1;
      display: inline-block;
      width: 227px;
      height: 290px;
      text-align: center;
      margin-right: 24px;
      background: linear-gradient(
        180deg,
        rgba(83, 77, 51, 1),
        rgba(198, 184, 119, 1)
      );
      border-radius: 8px;
      transition: transform 0.4s linear, box-shadow 0.4s linear;
      &:hover {
        transform: scale(1.3);
        box-shadow: 0 0 60px #000;
        z-index: 2;
      }
}

```

### 静态作用域动态作用域
JavaScript深入之词法作用域和动态作用域
因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。
而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。

```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

```

// 结果是 ???
假设JavaScript采用静态作用域，让我们分析下执行过程：
执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。
假设JavaScript采用动态作用域，让我们分析下执行过程：
执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。
前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1

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

## 当你想判断包含关系时

- 少量的用 ||，量大的试试 includes、indexOf、search、正则…… 你的代码量会更少，更优雅
- indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。摘自——es6阮一峰

## new Date 转时间戳

new Date().valueOf()和new Date().getTime()
还可以直接+：

```js

let date = new Date()

console.log(+date)

```

### 深拷贝

```js

function cloneObject (obj) {
    var newObj = {}
    //如果不是引用类型，直接返回
    if ( obj instanceof Object ) {
      return obj
    }
    //如果是引用类型，遍历属性
    else{
         for (var attr in obj) {
         //如果某个属性还是引用类型，递归调用
          newObj[attr] = cloneObject(obj[attr])
        }
    }
   
    return newObj
  }

```

浅拷贝

```js

var extend = function(destination,source) {
    for(var property in source) {
        destination[property] = source[property]
    }
    return destination
}

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

## 通过promise判断滚动事件是scrollTo触发的还是鼠标滚动触发的

```js

status = false;
	function timeout( long ){
		return new Promise( function( resolve, reject ){
			window.scrollTo( 0, long )
			setTimeout( resolve, 0 )
		} )
	};

	$(document).click( function(){
		status = true;
		timeout( 200 ).then( function(){
			status = false;
		} )
	} );

	$(window).scroll( function(){
		if( status == 'true' ){
			console.log( '点击事件触发的' )
		}else if( status == 'false' ){
			console.log( '滚动事件触发的' )
		}
	} )

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

** React **

React或Vue中如果函数不依赖于的组件（没有 this 上下文），则可以在组件外部定义它。 组件的所有实例都将使用相同的函数引用，因为该函数在所有情况下都是相同的。

Web 性能优化：缓存 React 事件来提高性能

在 JavaScript 中，函数的处理方式是相同的。如果 React 接收到具有不同内存地址的相同函数，它将重新呈现。如果 React 接收到相同的函数引用，则不会。

```js

class SomeComponent extends React.PureComponent {
  get instructions () {
    if (this.props.do) {
      return 'click the button: '
    }
    return 'Do NOT click the button: '
  }

  render() {
    return (
      <div>
        {this.instructions}
        <Button onClick={() => alert('!')} />
      </div>
    )
  }
}

```

这是一个非常简单的组件。 有一个按钮，当它被点击时，就 alert。 instructions 用来表示是否点击了按钮，这是通过 SomeComponent 的 prop 的 do={true} 或 do={false} 来控制。

这里所发生的是，每当重新渲染 SomeComponent 组件(例如 do 从 true 切换到 false)时，按钮也会重新渲染，尽管每次 onClick 方法都是相同的，但是每次渲染都会被重新创建。

每次渲染时，都会在内存中创建一个新函数(因为它是在 render 函数中创建的)，并将对内存中新地址的新引用传递给 ，虽然输入完全没有变化，该 Button 组件还是会重新渲染。

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

### vue/react使用JSDoc、jsconfig.json 完成vscode对于webpack的alias引入的js方法的提示
TS有个好处就是你引入方法会告诉你什么类型返回什么类型
首先你需要阅读JSDoc的文档和jsconfig.json的配置，你也可以百度下中文的文档
比如我的webpack的alias配置如下, common中是我的公共方法
chainWebpack: config => {
	 config.resolve.alias
      .set("@common", resolve("src/common"))
}
我如果在项目中使用@common/utils引入我需要的方法时，vscode是不会提示我引入这个js文件中有多少方法的，使用jsconfig.json就可以帮助vscode完成这项艰巨的任务
方法的提示怎么做呢，首先你需要首席几个基本的 @param 等注释规范， 比如

```js

/**
 *
 * @param {String} msg 提示的消息
 */
export const ht_notify_error = msg => {
  ht_notify({
    title: "非常抱歉...",
    message: msg,
    type: "error"
  });
};

```

之后你在文件中引入这个方法时就会提示这些信息了，亲自试试吧！
图文版的在我的博客中 https://blog.csdn.net/qq_37540004/article/details/89602242

### 全屏化某个DOM

```js

export default {
  data() {
    return {
      isFull: false
    };
  },
  mounted() {
    this.addListenWindow();
  },
  beforeDestroy() {
    this.removeListenWindow();
  },
  methods: {
    toggleFullScreen($el = document.querySelector("body")) {
      $el && this.fullScreen($el);
    },
    // 以下是全屏的逻辑
    fullScreen(el) {
      // 进入全屏  退出全屏
      if (window.navigator.userAgent.indexOf(".NET ") > -1) {
        if (
          window.outerHeight === window.screen.height &&
          window.outerWidth === window.screen.width
        ) {
          this.escFullScreen(el);
        } else {
          this.toFullScreen(el);
        }
      } else {
        !this.isFullScreen() ? this.toFullScreen(el) : this.escFullScreen(el);
      }
    },
    // 进入全屏
    toFullScreen(el) {
      (el.requestFullscreen && el.requestFullscreen()) ||
        (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
        (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) ||
        (el.msRequestFullscreen && el.msRequestFullscreen());
      this.isFull = true;
    },
    // 退出全屏
    escFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.isFull = false;
    },
    // 判断是否进入全屏
    isFullScreen() {
      // 火狐升级导致判断失效了 只用window去判断 谷歌 68版本以上也会有这个问题
      // window.fullScreen
      if (navigator.userAgent.indexOf("Firefox") >= 0) {
        return window.fullScreen;
      } else {
        return (
          window.fullScreen ||
          document.webkitIsFullScreen ||
          document.msFullscreenEnabled
        );
      }
    },
    // 获取chrome版本号
    getChromeVerson() {
      let userAgent = navigator.userAgent;
      let strStart = userAgent.indexOf("Chrome");
      let strStop = userAgent.indexOf(" Safari");
      let temp = userAgent.substring(strStart, strStop);
      let arr = temp.match(/\d+/);
      let version = arr[0] ? arr[0] : -1;
      return version;
    },
    addListenWindow() {
      // window.addEventListener("resize", this.toggleChange)
      document.addEventListener("fullscreenchange", this.toggleChange);
      document.addEventListener("webkitfullscreenchange", this.toggleChange);
      document.addEventListener("mozfullscreenchange", this.toggleChange);
      document.addEventListener("MSFullscreenChange", this.toggleChange);
    },
    removeListenWindow() {
      // window.removeEventListener("resize", this.toggleChange)
      document.removeEventListener("fullscreenchange", this.toggleChange);
      document.removeEventListener("webkitfullscreenchange", this.toggleChange);
      document.removeEventListener("mozfullscreenchange", this.toggleChange);
      document.removeEventListener("MSFullscreenChange", this.toggleChange);
    },
    toggleChange() {
      clearTimeout(this.reseizeTimeId);
      // 避免多次触发
      this.reseizeTimeId = setTimeout(() => {
        if (window.navigator.userAgent.indexOf(".NET ") > -1) {
          if (
            window.outerHeight === window.screen.height &&
            window.outerWidth === window.screen.width
          ) {
            this.isFull = true;
          } else {
            this.isFull = false;
          }
        } else {
          !this.isFullScreen() && (this.isFull = false);
        }
      }, 200);
    }
  }
};

```

### 如何根据url链接字符串获取href、protocol、host、search、hash等属性

iframe 直接把url赋值给location.href会从当前页面跳转到 url 的页面，如果我们在当前页面新建一个iframe并给它的src赋值这个 url ，似乎可以通过iframe的window.location拿到url的各个属性。
我们创建了一个a元素，并给它的href赋值了 url ，可以打印出这个a元素的对象，其中就包括 url 的这些属性。
利用a元素来解析 url 算是奇淫巧技吧，其实现代浏览器提供了一个创建的URL对象的构造函数—URL()，直接把url当作参数传入，就会返回一个URL对象。


### 数组打乱排序

```js

function shuffle(array) {
    var _array = array.concat();
    for (var i = _array.length; i--; ) {
        // 产生 0 - i 的随机数
        var j = Math.floor(Math.random() * (i + 1));
        var temp = _array[i];
        _array[i] = _array[j];
        _array[j] = temp;
    }
    return _array;
}

```

### es5实现class有感

```js

function inherit(subType, superType) {
	subType.prototype = Object.create(superType.prototype, {
		constructor: {
		  enumerable: false,
		  configurable: true,
		  writable: true,
		  value: subType
		}
	})
	Object.setPrototypeOf(subType, superType)
}

```

ES6 的 class 内部是基于寄生组合式继承，它是目前最理想的继承方式，通过 Object.create 方法创造一个空对象，并将这个空对象继承 Object.create 方法的参数，再让子类（subType）的原型对象等于这个空对象，就可以实现子类实例的原型等于这个空对象，而这个空对象的原型又等于父类原型对象（superType.prototype）的继承关系
而 Object.create 支持第二个参数，即给生成的空对象定义属性和属性描述符/访问器描述符，我们可以给这个空对象定义一个 constructor 属性更加符合默认的继承行为，同时它是不可枚举的内部属性（enumerable:false）
而 ES6 的 class 允许子类继承父类的静态方法和静态属性，而普通的寄生组合式继承只能做到实例与实例之间的继承，对于类与类之间的继承需要额外定义方法，这里使用 Object.setPrototypeOf 将 superType 设置为 subType 的原型（Sub.__proto__ === Super // true），从而能够从父类中继承静态方法和静态属性
静态方法和静态属性用es5实现就是如下，这些方法实例不可继承

```js

function Super(){};
Super.speak = function(){console.log('woff!!!'， this)}
Super.name = 'xxx'
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
实例代码
function inherit(subType, superType) {
      subType.prototype = Object.create(superType.prototype, {
        constructor: {
          enumerable: false,
          configurable: true,
          writable: true,
          value: subType
        }
      })
}

```

### fileReader可以读text文本奥！

```js

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
    </head>
    <body>
        <input type="file" onchange="fileChange(event)" />
        <textarea name="" id="textContent" cols="30" rows="10"></textarea>
        <script>
            function fileChange(event) {
                var file = event.target.files[0]
                if (file && /text/.test(file.type)) {
                    var fileRead = new FileReader()
                    fileRead.onload = function(result) {
                        var $el = document.getElementById('textContent')
                        $el.value = this.result
                    }
                    fileRead.readAsText(file, 'gbk')
                }
            }
        </script>
    </body>
</html>

```

### 规范git提交信息，请使用commitlint
git commit 提交规范 & 规范校验 如何写好 Git commit messages git commit 规范指南
用于说明 commit 的类别，只允许使用下面7个标识。

    feat：新功能（feature）
    fix：修补bug
    docs：文档（documentation）
    style： 格式（不影响代码运行的变动）
    refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    test：增加测试
    chore：构建过程或辅助工具的变动
    
如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中

### focus状态下的dom，按键盘的enter键会触发click事件
解决方案就是 让这个dom blur 可以通过documnet.activeElement 来获得当前focus的DOM

### 数组去重并统计每一项有几个

```js

var arr = ["a","b","c","c","ab","d","ab","d","c"],
	newArr = [],
	obj = {};
for ( var i = 0, l = arr.length; i < l; i++ ){
    if( newArr.indexOf( arr ) <= -1 ){
        newArr.push( arr );
        obj[arr] = 1
    }else {
        obj[arr] = obj[arr] + 1;
    }    
}

```

### Array.prototype.methods.apply()的妙用

Array.prototype.concat.apply([], [1,2,[3,4,[5,6]]]) // [1, 2, 3, 4, Array(2)] 可以铺平2维数组
Array.prototype.push.apply() 可以合并数组

### axios的canceltoken在多个相同请求的场景中的使用

参考axios取消接口请求

业务场景分析： 一个列表页，每行包含很多个业务信息，其中有两个字段剩余流量，已用流量是后端要查询移动那边的接口，查移动的接口很慢，于是考虑把查列表和查数据流量的接口拆分开，于是就有了现在的业务场景。待请求完列表的接口后，先把列表的数据渲染到页面上，之后再请求数据流量的接口，查到数据流量的数据后，通过vm.$set将流量数据和列表数据拼在一起，这样用户在进页面的时候不会感觉到等待很久，提升用户体验。但是也带来了一个问题，数据流量还没查到，用户搜索，点下一页等操作触发重新获取列表数据，这个时候需要取消掉未请求结束的获取流量的请求，于是就用到了cancelToken来取消axios的请求。
由于是同时多个请求，我们可以定义一个数组arr，用来管理每个请求的canceltoken
假设有10个请求，每个请求设置一个canceltoken加入到arr中
请求结束，从数组中移除这个canceltoken
如果请求数据流量的没结束，从新获取列表数据了，那么久清除arr中所有的请求链接

### js 微任务 宏任务

这一次，彻底弄懂 JavaScript 执行机制

同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
当指定的事情完成时，Event Table会将这个函数移入Event Queue。
主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。 4.上述过程会不断重复，也就是常说的Event Loop(事件循环)。

```js

let data = [];
$.ajax({
    url:www.javascript.com,
    data:data,
    success:() => {
        console.log('发送成功!');
    }
})
console.log('代码执行结束');


// ajax进入Event Table，注册回调函数success。
// 执行console.log('代码执行结束')。
// ajax事件完成，回调函数success进入Event Queue。
// 主线程从Event Queue读取回调函数success并执行。
macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
micro-task(微任务)：Promise，process.nextTick

```
