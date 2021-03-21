1. 响应式原理
vue从options里拿到data、props、methods属性之后会遍历判断是否重复，并且会在vue实例对象上添加代理访问数据对象的同名属性，然后调用observe函数开启响应式

在observe函数里，会判断value是否含有_observe_属性，且判断是非服务器端渲染，value必须是数组和纯对象，且数据对象是可扩展的，且不是vue内部实例对象

然后调用Observe构造函数
首先会创建依赖收集，然后判断value是数组还是对象，这两个处理方式是不同的，对于对象，会遍历出所有可枚举的属性，然后for循环遍历这些属性，调用defineReactive函数

首先会为每个key建立一个依赖收集筐，dep，然后通过object.defineProperty函数定义访问器属性。这里有两个依赖收集，一个是dep还有一个是child.ob，因为js的语言限制，在没有proxy之前，vue没办法拦截到给对象添加属性的操作，所以vue提供了语法糖vue.$set，这个就会触发data.a._ob_.dep的依赖，在get里收集了依赖（还会在读取时返回正确的依赖）就会在set里触发依赖（还会设置新值，当新值是个数组或对象后，还会再掉用observe进行观测），最后会把dep里的依赖都执行一下

如果value是数组会麻烦一些，数组有很多的实例方法，如：push、pop、shift、unshift、splice、sort 以及 reverse 等，当用户调用这些方法时我们需要触发依赖，vue会先缓存数组原本的方法，然后重写一个同名的函数，并在这个自己定义的同名函数里进行依赖收集，当调用这些方法时，我们需要将这些数组的所有依赖拿出来执行

```js

const data = {
  // 属性 a 通过 setter/getter 通过闭包引用着 dep 和 childOb
  a: {
    // 属性 b 通过 setter/getter 通过闭包引用着 dep 和 childOb
    b: 1
    __ob__: {a, dep, vmCount}
  }
  __ob__: {data, dep, vmCount}
}

```

2. 为什么data是一个函数，且返回了一个对象
因为我们组件是复用的，当我们创建多个组件，这样每个组件的data是不同的，没有共享data对象，这时候我们对里面的值进行修改不会影响到其他组件里的data数据

3. 计算属性
渲染模板的时候dep.target全局变量里放的是渲染watcher，当读取到计算属性的时候会将其变为计算watcher

不缓存：
count改变，先通知计算watcher更新，设置dirty=true
再通知渲染watcher更新，视图重新渲染时候去计算watcer中读取值，发现dirty为true，重新执行用户传入的函数求值
缓存：
other改变，直接通知渲染watcher更新
视图重新渲染去计算watch中读取值，发现dirty为false，直接用缓存的值不执行用户传入的函数求值

4. 依赖收集和派发更新
在我们写template模板的时候，vue会首次形成一个渲染watcher，并赋值给dep.target这个全局变量。在求值的过程(其实就是vue组件重新渲染的函数)中会读取到data里的属性，那么每个属性下的dep就会收集到这个watcher作为依赖，下次属性更新了，就会从dep中找出它收集到的watch触发watch.update()去更新

一进来就会对value进行计算，执行dep.notify()，他会判断这是计算属性的watcher还是同步watcher

5. nextTick
micro是在同步方法完成的末尾执行，macro是到下一个task，而task之间又可能穿插了浏览器的重渲染等
nextTick会将外部传入的函数回调存在内部数组中，nextTick内部有一个用来遍历这个内部数组的函数，而这个函数是异步执行的，什么时候执行取决于这个函数是属于什么类型的异步任务，micro或macro

6. 生命周期
new Vue => init => beforeCreate => initProps methods data computed watch => created => $mount(runtime-with-compiler)会将模板编译render函数，mountComponent => beforeMount => watch(diff) => mounted
响应式数据更新触发beforeUpdate => updated
销毁 beforeDestoryed => destoryed

7. diff
不是相同的节点：直接销毁旧的vnode，渲染新的vnode
是相同的节点：
(1). 新vnode是文字 直接替换
(2). 对子节点进行对比
如果有新children没有旧children 直接新增子节点
如果有旧children没有新children 直接删除子节点
如果都存在

判断sameVnode 首先会判断key值
旧首节点和新首节点
旧尾节点和新尾节点
旧首节点和新尾节点
旧尾节点和新首节点
以上都不符合，会将所有旧子节点的key做一个映射下标的key -> index 表，用新的vnode的key去找出旧节点中可以复用的位置，然后不停的把匹配到的指针向内部压缩，直到新旧节点有一端指针相遇
